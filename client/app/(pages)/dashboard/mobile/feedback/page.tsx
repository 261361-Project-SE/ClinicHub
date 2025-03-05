"use client";

import Error from "@/app/error";
import PageLoader from "@/components/PageLoader";
import MobileDashboardLayout from "@/components/dashboard/mobile/MobileDashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFetchFeedback } from "@/hooks/useFetchFeedback";
import { ArrowLeft, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FeedbackItem {
  id: number;
  rating: number;
  comment: string;
}

const FeedbackPage = () => {
  const { feedback, loading, error } = useFetchFeedback();
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  if (loading) {
    <PageLoader />;
  }
  if (error) {
    return <Error error={error} />;
  }

  const filteredFeedback = selectedRating
    ? feedback.filter((item) => item.rating === selectedRating)
    : feedback;

  return (
    <MobileDashboardLayout>
      <div className="fixed top-0 z-50 w-full px-4 py-6 bg-white">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 text-gray-700"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-lg font-medium">ความพึงพอใจ</h2>
        </div>
      </div>

      <div className="container mx-auto mt-[80px] px-2 py-4">
        <div className="flex items-center justify-between mb-6">
          <Card className="flex p-2 bg-white shadow-shadow-bg w-full overflow-y-scroll items-center space-x-2">
            <div className="flex space-x-1">
              {[1, 2, 3].map((rating) => (
                <Button
                  key={rating}
                  variant={selectedRating === rating ? "default" : "outline"}
                  size="sm"
                  className={`px-3 ${
                    selectedRating === rating
                      ? "bg-pink-200 hover:bg-pink-300"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedRating(selectedRating === rating ? null : rating)
                  }
                >
                  <StarIcon
                    className={`h-4 w-4 mr-1 ${
                      selectedRating === rating
                        ? "fill-white text-white"
                        : "fill-yellow-400 text-yellow-400"
                    }`}
                  />
                  <span>{rating}</span>
                </Button>
              ))}
              {selectedRating && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRating(null)}
                  className="text-gray-500"
                >
                  ล้างตัวกรอง
                </Button>
              )}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map((feedbackItem) => (
              <FeedbackCard key={feedbackItem.id} feedback={feedbackItem} />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                {selectedRating
                  ? `ไม่พบความคิดเห็นที่มีคะแนน ${selectedRating} ดาว`
                  : "ไม่พบข้อมูลความคิดเห็น"}
              </p>
            </div>
          )}
        </div>
      </div>
    </MobileDashboardLayout>
  );
};

const FeedbackCard = ({ feedback }: { feedback: FeedbackItem }) => {
  return (
    <Card className={status === "hidden" ? "opacity-70" : ""}>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${
                i < feedback.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2 text-gray-700 bg-gray-50 p-4 rounded-lg">
          {feedback.comment}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackPage;
