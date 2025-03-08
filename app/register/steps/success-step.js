import { CheckCircle2 } from 'lucide-react';

export default function SuccessStep({ formData }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-8 text-center">
      <div className="h-24 w-24 rounded-full bg-indigo-900/30 flex items-center justify-center border border-indigo-500">
        <CheckCircle2 className="h-12 w-12 text-indigo-400" />
      </div>

      <h2 className="text-2xl font-bold text-white">
        Application Submitted Successfully!
      </h2>

      <p className="text-gray-300 max-w-md leading-relaxed">
        Thank you for applying to TEDx Labyrinthine. We've received your
        application and will review it shortly.
        <br />
        <br />
        You will receive an email within 5-7 business days with the status of
        your application. If approved, the email will include payment
        instructions and next steps.
      </p>

      <div className="text-sm text-gray-400 pt-4 bg-white/5 p-5 rounded-md w-full">
        <p>Reference ID: TEDx-{formData.reference_no}</p>
        <p>Submission Date: {new Date().toLocaleDateString()}</p>
        <p className="mt-3">
          If you have any questions, please contact{' '}
          <span className="text-indigo-400">support@tedxlabyrinthine.com</span>
        </p>
      </div>
    </div>
  );
}
