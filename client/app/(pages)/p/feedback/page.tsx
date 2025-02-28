"use client";

import LineQRDialog from "../components/LineQRDialog";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { createFeedback } from "../services/api-p";
import FeedbackLayout from "@/app/(pages)/p/feedback/feedbackLayout";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const FeedbackPage: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = async () => {
    if (!rating || !comment) {
      setError("กรุณาให้คะแนนและเขียนความคิดเห็น");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false); // รีเซ็ตสถานะความสำเร็จ

    try {
      const response = await createFeedback(rating, comment);
      if (response) {
        setIsSuccess(true); // ตั้งค่าสถานะความสำเร็จ
        setRating(0);
        setComment("");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดขณะส่งความคิดเห็น");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FeedbackLayout>
      {isSuccess && (
        <Alert className="mb-2 bg-white text-green-400 border border-text-success font-noto font-semibold">
          <AlertTitle>ส่งความคิดเห็นสำเร็จ</AlertTitle>
          <AlertDescription>ขอบคุณสำหรับความคิดเห็นของคุณ!</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert className="mb-2 bg-white text-red-500 border border-red-500 font-noto font-semibold">
          <AlertTitle>เกิดข้อผิดพลาด</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="feedback-container p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-normal mb-6 flex justify-center font-noto">
          ประเมินความพึงพอใจในการใช้งาน
        </h1>
        <div className="flex justify-center mb-6">
          ความพึงพอใจของคุณคือระดับใด
        </div>
        <div className="emoji-rating flex justify-center space-x-4 mb-8">
          <button
            className={`text-4xl ${
              rating === 1 ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => handleRatingClick(1)}
          >
            😞
          </button>
          <button
            className={`text-4xl ${
              rating === 2 ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => handleRatingClick(2)}
          >
            😐
          </button>
          <button
            className={`text-4xl ${
              rating === 3 ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => handleRatingClick(3)}
          >
            😊
          </button>
        </div>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md h-[400px]"
          placeholder="เขียนฟีดแบ็กที่นี่..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex justify-end">
          <button
            className="mt-4 px-4 py-2 bg-pink-200 text-white rounded-md hover:bg-pink-200 disabled:bg-pink-100 hover:scale-110"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "กำลังส่ง..."
            ) : (
              <ArrowRight className="icon-size w-6 h-6" strokeWidth={2} />
            )}
          </button>
        </div>

        <LineQRDialog />
      </div>
      <div className="flex justify-end mt-4">
        <Link href="/">
          <button className="bg-gray-300 text-black hover:opacity-80 shadow-md w-[140px] md:w-[173px] h-[50px] rounded-full">
            กลับหน้าหลัก
          </button>
        </Link>
      </div>
    </FeedbackLayout>
  );
};

export default FeedbackPage;
