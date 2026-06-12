import { MessageCircle } from "lucide-react";

interface Props {
  productName: string;
  finishLabel?: string;
  phone?: string;
}

export const WhatsAppCTA = ({ productName, finishLabel, phone = "555430675192" }: Props) => {
  const message = finishLabel
    ? `Olá! Tenho interesse no produto ${productName} no acabamento ${finishLabel}.`
    : `Olá, tenho interesse no produto ${productName} que vi no site.`;
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 flex w-full items-center justify-center gap-2 bg-[#1F4E3D] px-5 py-3.5 text-white transition-opacity hover:opacity-90"
    >
      <MessageCircle size={18} strokeWidth={1.6} />
      <span className="font-sans text-sm font-semibold tracking-[0.01em]">
        {finishLabel ? `Pedir ${finishLabel} via WhatsApp` : "Tenho interesse via WhatsApp"}
      </span>
    </a>
  );
};
