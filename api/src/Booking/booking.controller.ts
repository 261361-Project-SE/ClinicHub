import { Request, Response } from "express";
import { bookingService } from "./booking.service";
const express = require("express");

class BookingController {
    constructor() { }

    // ดู การจองทั้งหมด หมอ
    async getAllBooking(req: Request, res: Response) {
        try{
            const result = await bookingService.getAllBooking();
            res.status(200).send(result);
        }catch(err){
            res.status(400).send("Internal Server Error while create appointment");
        }
    }
    // รับชื่อ และ นามสกุล เพื่อ หา ข้อมูล ของคนไข่
    async getBooking(req: Request, res: Response) {
        try{
            console.log(req.params);
            const result = await bookingService.getBooking(req.params);
            res.status(200).send(result);
        }catch(err){
            res.status(400).send("Internal Server Error while create appointment");
        }
    }
    // สร้างการจอง ทั้งหมอและ คนไข่
    async createBooking(req: Request, res: Response) {
        try{
            const result = await bookingService.creteBooking(req.body);
            res.status(200).send(result);
        }catch(err){
            res.status(400).send("Internal Server Error while create appointment");
        }
    }
    //  update การจอง ทั้งหมอและ คนไข่
    //  รับ UID เพื่อ หา และ อัพเดทข้อมูล
    async updateBooking(req: Request, res: Response) {
        try{
            const result = await bookingService.updateBooking(req.body);
            res.status(200).send(result);
        }catch(err: any){
            res.status(400).send({ error: err });
        }
    }
    //  delete (ยกเลิกการจอง) การจอง ทั้งหมอ และ คนไข่
    //  รับ UID 
    async deleteBooking(req: Request, res: Response) {
        try{
            console.log(req.body);
            const result = await bookingService.deleteBooking(req.body);
            res.status(200).send(result);
        }catch(err){
            res.status(400).send({ error: err });
        }
    }
}
export const bookingController = new BookingController();
