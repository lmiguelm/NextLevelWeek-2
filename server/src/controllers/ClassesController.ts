import { Request, Response, response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem{
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController{

    async index(req: Request, res: Response){

        const filters = req.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.subject || !filters.week_day || !filters.time){
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);
        
        const classes = await db('classes')
            .select(['classes.*', 'users.*'])
            .join('users', 'classes.user_id', '=', 'users.id')
            .where('classes.subject', '=', subject)
            .whereExists(function(){
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [ Number(week_day) ])
                .whereRaw('`class_schedule`.`from` <= ??', [ timeInMinutes ])
                .whereRaw('`class_schedule`.`to` > ??', [ timeInMinutes ])
            })

        return res.json(classes); 
    }

    async create(req: Request, res: Response){
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
    
        const transaction = await db.transaction();
    
        try{
            const insertedUsersIds = await transaction('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });
        
            const user_id = insertedUsersIds[0];
        
            const insertedClassesIds = await transaction('classes').insert({
                subject,
                cost,
                user_id,
            });
        
            const class_id = insertedClassesIds[0];
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem ) => {
                return{
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                    class_id,
                };
            })
        
            await transaction('class_schedule').insert(classSchedule);
        
            await transaction.commit();
        
            return res.status(201).send();
    
        }catch(err){
            await transaction.rollback();
    
            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}