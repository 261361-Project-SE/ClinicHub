(Installation and Deployment Manual)

1. คำแนะนำเบื้องต้น

เอกสารนี้อธิบายขั้นตอนการติดตั้งและการใช้งานระบบที่พัฒนาโดยใช้ Next.js พร้อมกับ Docker บนเซิร์ฟเวอร์ รวมถึงการตั้งค่าตัวแปรแวดล้อม (Environment Variables)

2. ข้อกำหนดเบื้องต้น

ซอฟต์แวร์ที่ต้องติดตั้งบนเซิร์ฟเวอร์

Git สำหรับการดึงโค้ดจากรีโมท Repository

Node.js (เวอร์ชันที่รองรับกับโปรเจกต์นี้)

npm หรือ yarn สำหรับจัดการแพ็กเกจ

Docker และ Docker Compose สำหรับการรันคอนเทนเนอร์

PostgreSQL เป็นฐานข้อมูลที่ใช้ในระบบ

3. ขั้นตอนการติดตั้งและการใช้งาน

3.1 ดึงซอร์สโค้ดจาก Git Repository

เข้าสู่เซิร์ฟเวอร์ผ่าน SSH และไปยังโฟลเดอร์ที่ต้องการเก็บโค้ด จากนั้นรันคำสั่ง:

    git clone https://github.com/261361-Project-SE/ClinicHub

3.2 ติดตั้งแพ็กเกจที่จำเป็น

หลังจากดึงซอร์สโค้ดมาแล้ว ให้รันคำสั่ง:

    npm install

3.3 ตั้งค่าตัวแปรแวดล้อม (.env)

ก่อนทำการรันโปรเจกต์ ต้องแก้ไขไฟล์ .env โดยตั้งค่าตามความเหมาะสม:

    DATABASE_URL=postgres://postgres:admin@postgres:5432/prisma
    GOOGLE_CLIENT_ID="pls insert your google client id"
    GOOGLE_CLIENT_SECRET="pls insert your google client secret"
    GOOGLE_REFRESH_TOKEN="pls insert your google refresh token"
    LINE_ACCESS_TOKEN="pls insert your line access token"
    LINE_USER_ID="pls insert your line user id"

    "pls modify the following variables to your own"
    NEXT_PUBLIC_BASE_URL_API=https://booking.clinic.se.cpe.eng.cmu.ac.th/api
    API_END_POINT=https://booking.clinic.se.cpe.eng.cmu.ac.th/api
    BASE_URL_API=https://booking.clinic.se.cpe.eng.cmu.ac.th/api

    NEXT_PUBLIC_BASE_URL_CANLENDAR="pls insert your google calendar url"

    CLINIC_API_ENDPOINT=https://clinic.se.cpe.eng.cmu.ac.th/api
    CLINIC_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

หมายเหตุ: ต้องแก้ไขค่าต่างๆ ให้ตรงกับข้อมูลจริงก่อนเริ่มใช้งาน

3.4 รันโปรเจกต์ด้วย Docker Compose

หลังจากตั้งค่า .env แล้ว ให้ใช้คำสั่งด้านล่างเพื่อสร้างและรันคอนเทนเนอร์:

    docker compose up -d --build

คำอธิบาย:

-d รันคอนเทนเนอร์ในโหมดเบื้องหลัง (detached mode)

--build ทำการ build ใหม่ทั้งหมดก่อนเริ่มรัน

4. การตรวจสอบสถานะการทำงาน

4.1 ตรวจสอบสถานะคอนเทนเนอร์

ใช้คำสั่งต่อไปนี้เพื่อตรวจสอบว่าคอนเทนเนอร์ทำงานอยู่หรือไม่:

    docker ps

หากคอนเทนเนอร์ทำงานอยู่ ควรเห็นสถานะ Up ในรายการ

4.2 ดู Log ของคอนเทนเนอร์

หากต้องการตรวจสอบ Log ของแอปพลิเคชัน ให้ใช้คำสั่ง:

    docker logs -f <container_name>

แทนที่ <container_name> ด้วยชื่อคอนเทนเนอร์ที่ต้องการตรวจสอบ

5. การอัปเดตโค้ดและรีสตาร์ทระบบ

5.1 อัปเดตซอร์สโค้ด

เมื่อมีการอัปเดตโค้ดใหม่ สามารถใช้คำสั่งต่อไปนี้เพื่อดึงโค้ดเวอร์ชันล่าสุด:

    git pull

5.2 รีสตาร์ทระบบ

หลังจากอัปเดตโค้ดแล้ว ให้ใช้คำสั่งต่อไปนี้เพื่อรีสตาร์ทระบบ:

    docker compose up -d --build

6. การหยุดและลบคอนเทนเนอร์

6.1 หยุดคอนเทนเนอร์

    docker compose down

6.2 ลบคอนเทนเนอร์ทั้งหมดและข้อมูลที่เกี่ยวข้อง (ระวังการใช้คำสั่งนี้ เพราะจะลบข้อมูลทั้งหมดในคอนเทนเนอร์ด้วย)

    docker compose down -v

7. สรุป

คู่มือนี้อธิบายขั้นตอนการติดตั้งและการใช้งานระบบ รวมถึงการตั้งค่า .env การรันด้วย Docker Compose และการอัปเดตโค้ด

หมายเหตุ:

โปรดตรวจสอบการตั้งค่าทั้งหมดก่อนเริ่มใช้งานจริง

หากพบปัญหาในการติดตั้งหรือใช้งาน ให้ตรวจสอบ Log ของคอนเทนเนอร์เพื่อดูข้อผิดพลาด
