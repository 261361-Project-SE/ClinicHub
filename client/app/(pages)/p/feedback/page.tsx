"use client";

import FeedbackLayout from "@/app/(pages)/p/feedback/feedbackLayout";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FeedbackPage: React.FC = () => {
  return (
    <FeedbackLayout>
      <div className="feedback-container p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-normal mb-6 flex justify-center font-noto">
          ประเมินความพึงพอใจในการใช้งาน
        </h1>
        <div className="flex justify-center mb-6">
          ความพึงพอใจของคุณคือระดับใด
        </div>
        <div className="emoji-rating flex justify-center space-x-4 mb-8">
          <button className="text-4xl">😞</button>
          <button className="text-4xl">😐</button>
          <button className="text-4xl">😊</button>
        </div>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md h-[400px]"
          placeholder="เขียนฟีดแบ็กที่นี่..."
        />
        <div className="flex justify-end">
          <button className="mt-4 px-4 py-2 bg-pink-200 text-white rounded-md hover:bg-pink-400">
            <ArrowRight className="icon-size w-6 h-6" strokeWidth={2} />
          </button>
        </div>
        <div className="flex justify-start">
          <Link
            href="/"
            className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </FeedbackLayout>
  );
};

export default FeedbackPage;
