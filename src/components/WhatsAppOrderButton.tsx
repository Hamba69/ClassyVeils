export default function WhatsAppOrderButton({
  veilName,
  whatsappNumber,
}: {
  veilName: string;
  whatsappNumber: string;
}) {
  if (!whatsappNumber) return null;

  const message = encodeURIComponent(
    `Hi! I'd like to order the ${veilName} from Classyveils.ug.`
  );
  const digits = whatsappNumber.replace(/[^\d]/g, "");
  const href = `https://wa.me/${digits}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-medium text-linen transition hover:bg-ink"
    >
      Order on WhatsApp
    </a>
  );
}
