import { CheckCircle2, MessageCircle, Truck } from "lucide-react";

const announcements = [
  "Genuine, OEM and aftermarket parts for popular Honda models",
  "Nationwide delivery across Pakistan, confirmed by our team",
  "Order easily on WhatsApp",
];

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-center text-xs font-medium tracking-wide">
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          {announcements.map((message, index) => (
            <li key={message} className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-gray-200">
                {index === 0 ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-honda" aria-hidden />
                ) : index === 1 ? (
                  <Truck className="h-3.5 w-3.5 text-honda" aria-hidden />
                ) : (
                  <MessageCircle className="h-3.5 w-3.5 text-honda" aria-hidden />
                )}
                {message}
              </span>
              {index < announcements.length - 1 && (
                <span className="hidden h-1 w-1 rounded-full bg-charcoal-soft sm:block" aria-hidden />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
