import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import lineicon from "@/public/lineicon.svg";
import Image from "next/image";
import React from "react";

const LineQRDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="fixed bottom-6 right-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors duration-200 z-50">
          <Image
            src={lineicon}
            alt="Line logo"
            width={24}
            height={24}
            className="w-fit h-fit"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact us on Line</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center p-4">
          <a
            href="https://line.me/R/ti/p/@109ggfwd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/qr.png"
              alt="Line QR Code"
              width={192}
              height={192}
              className="w-fit h-fit object-contain"
            />
          </a>
        </div>
        <p className="text-center text-sm text-gray-500">
          Scan this QR code with your Line app to connect with us
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LineQRDialog;
