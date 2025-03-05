"use client";

import Error from "@/app/error";
import PageLoader from "@/components/PageLoader";
import MobileDashboardLayout from "@/components/dashboard/mobile/MobileDashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFetchFeedback } from "@/hooks/useFetchFeedback";
import { ArrowLeft, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface FeedbackItem {
  id: number;
  rating: number;
  comment: string;
}

const FeedbackPage = () => {
  const { feedback, loading, error } = useFetchFeedback();
  const router = useRouter();

  if (loading) {
    <PageLoader />;
  }
  if (error) {
    return <Error error={error} />;
  }

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
        <div className="grid grid-cols-1 gap-6">
          {feedback.length > 0 ? (
            feedback.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">ไม่พบข้อมูลความคิดเห็น</p>
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
          {Array.from({ length: 5 }).map((_, i) => (
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
          "{feedback.comment}"
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackPage;
