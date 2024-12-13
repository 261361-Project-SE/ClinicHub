import { Request, Response } from "express";
import { bookingService } from "./booking.service";
const express = require("express");

class BookingController {
  constructor() {}

  async createBooking(req: Request, res: Response) {
    try {
      const result = await bookingService.creteBooking(req.body);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }

  // ดู การจองทั้งหมด หมอ
  async getAllBooking(req: Request, res: Response) {
    try {
      const result = await bookingService.getAllBooking();
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }
  // รับชื่อ และ นามสกุล เพื่อ หา ข้อมูล ของคนไข่
  async getBookingByName(req: Request, res: Response) {
    try {
      const result = await bookingService.getBookingByName(req.params);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }
  async getBookingByPhone(req: Request, res: Response) {
    try {
      const result = await bookingService.getBookingByPhone(req.params);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }
  async getAllBookingByDate(req: Request, res: Response) {
    try {
      const result = await bookingService.getAllBookingByDate(req.params);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }
  // สร้างการจอง ทั้งหมอและ คนไข่

  //  update การจอง ทั้งหมอและ คนไข่
  //  รับ UID เพื่อ หา และ อัพเดทข้อมูล
  async updateBookingByUID(req: Request, res: Response) {
    try {
      const result = await bookingService.updateBookingByUID(req.body);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }

  // อัพเดทข้อมูลการจอง ของคนไข่ update ได้หมด
  async updateBookingByDate(req: Request, res: Response) {
    try {
      const result = await bookingService.updateBookingByDate(req.body);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }

  //  delete (ยกเลิกการจอง) การจอง ทั้งหมอ
  //  รับ UID
  async deleteBooking(req: Request, res: Response) {
    try {
      console.log(req.body);
      const result = await bookingService.deleteBooking(req.body);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }

  //  delete (ยกเลิกการจอง) การจอง ของคนไข่
  //  รับ firstname และ lastname
  async deleteBookingByPatient(req: Request, res: Response) {
    try {
      const result = await bookingService.deleteBookingByPatient(req.body);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }
}
export const bookingController = new BookingController();
