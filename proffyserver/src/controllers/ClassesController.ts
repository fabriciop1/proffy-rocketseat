import { Request, Response } from 'express';
import db from '../database/connection';
import TimeConverter from '../util/ConvertTime';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async create(request: Request, response: Response) {
    const { 
      name, 
      avatar,
      whatsapp, 
      bio, 
      subject, 
      cost, 
      schedule 
    } = request.body;
  
    const trx = await db.transaction()
  
    try {
      const userIds = await trx('users').insert({
        name, avatar, whatsapp, bio
      })
    
      const user_id = userIds[0];
    
      const classesIds = await trx('classes').insert({
        subject, cost, user_id
      })
    
      const class_id = classesIds[0];
      const timeConverter = new TimeConverter();
    
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: timeConverter.convertTimeToMinutes(scheduleItem.from),
          to: timeConverter.convertTimeToMinutes(scheduleItem.to),
          class_id
        }
      });
    
      await trx('class_schedule').insert(classSchedule);
    
      await trx.commit();
    
      return response.status(201).send();
    } catch(err) {
      await trx.rollback();
      return response.status(400).json({error: 'unexpected error creating new class.'})
    }
  }

  async read(request: Request, response: Response) {
    const filters = request.query;

    if (!filters.subject || !filters.time || !filters.week_day) {
      return response.status(400).json({Error: "Missing filters on search."});
    }

    const subject = filters.subject as string;
    const time = filters.time as string;
    const week_day = filters.week_day as string;

    const timeConverter = new TimeConverter();
    const timeInMinutes = timeConverter.convertTimeToMinutes(time);

    const classes = await db('classes')
    .whereExists(function() {
      this.select('class_schedule.*')
      .from('class_schedule')
      .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
      .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
      .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
      .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
    })
    .where('classes.subject', '=', subject)
    .join('users', 'classes.user_id', '=', 'users.id')
    .select(['classes.*', 'users.*']);

    return response.json(classes); 
  }
}