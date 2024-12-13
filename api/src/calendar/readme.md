# Calendar API

API -> Google Calendar -> ดึงข้อมูลกิจกรรม สร้างการจองใหม่ การลบกิจกรรม

## API Endpoints

### 1. **เช็คคิว** (`GET /list-events`)

- ใช้สำหรับดึงข้อมูลกิจกรรมใน Google Calendar ที่มีในช่วง 30 วันถัดไปจากเวลาปัจจุบัน
- **Response**:
  - 200 OK: ส่งกลับข้อมูลกิจกรรมที่มี
  - 404 Not Found: ไม่มีกิจกรรมในช่วงเวลาที่กำหนด
  - 500 Internal Server Error: เกิดข้อผิดพลาดในการดึงข้อมูลจาก Google Calendar

### 2. **จอง** (`POST /create-event`)

- ใช้สำหรับจองกิจกรรมใหม่ โดยระบุปี, เดือน, วัน, ชั่วโมง (ในรูปแบบ 24 ชั่วโมง) และนาที
- **Request Body**:
  ```json
  {
    "year": 2024,
    "month": 12,
    "day": 20,
    "hour": 14,
    "minute": 45
  }
  ```

### 3. **ลบ** (`DELETE /delete-event/:eventId`)

{
"eventId": "xxx"
}

บ่เข้าใจถาม
