'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  IS_PRE_SPEAKER_PERIOD,
  PRE_SPEAKER_DISCOUNT,
  SCHOLAR_AMA_DISCOUNT,
  ATENEAN_DISCOUNT,
  PRE_SPEAKER_PERIOD_START,
  PRE_SPEAKER_PERIOD_END,
  GROUP_DISCOUNT,
} from '@/app/config/config';
import { useState, useEffect } from 'react';

export default function DiscountEligibilityStep({
  formData,
  updateFormData,
  errors = {},
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date(PRE_SPEAKER_PERIOD_END);
      const now = new Date();
      const difference = endDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDiscountChange = (value) => {
    const isScholarOrAma = value === 'scholar_ama';
    const isAtenean = value === 'atenean';

    // Reset registration type to single and clear additional attendees
    updateFormData({
      ...formData,
      is_scholar_or_ama: isScholarOrAma,
      is_atenean: isAtenean,
      registration_type: 'single',
      additional_attendees: [],
    });
  };

  return (
    <div className="space-y-8">
      {IS_PRE_SPEAKER_PERIOD && (
        <div className="bg-indigo-900/30 border border-indigo-500 p-4 rounded-md">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse"></div>
            <p className="text-indigo-300 font-medium">
              Pre-speaker Discount Period
            </p>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Enjoy a special ₱{PRE_SPEAKER_DISCOUNT} discount during{' '}
            {new Date(PRE_SPEAKER_PERIOD_START).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            })}
            -
            {new Date(PRE_SPEAKER_PERIOD_END).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            })}
            ! This discount will be applied automatically and cannot be combined
            with other discounts.
          </p>
          <div className="flex items-center mt-3 bg-indigo-950/50 p-2 rounded border border-indigo-700">
            <span className="text-sm text-indigo-200 mr-2">
              Time remaining:
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-indigo-300 font-medium">
                  {timeLeft.days}
                </span>
                <span className="text-gray-400 text-sm">d</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-indigo-300 font-medium">
                  {timeLeft.hours}
                </span>
                <span className="text-gray-400 text-sm">h</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-indigo-300 font-medium">
                  {timeLeft.minutes}
                </span>
                <span className="text-gray-400 text-sm">m</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-indigo-300 font-medium">
                  {timeLeft.seconds}
                </span>
                <span className="text-gray-400 text-sm">s</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!IS_PRE_SPEAKER_PERIOD && (
        <div className="bg-green-900/30 border border-green-500 p-4 rounded-md">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <p className="text-green-300 font-medium">
              Bundle Discount Available!
            </p>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Register as a group of 3 or more and get a ₱{GROUP_DISCOUNT}{' '}
            discount on your total purchase! Only available for non-Atenean
            registrations.
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-4 bg-white/5 p-6 rounded-md">
          <div className="text-sm text-gray-400 mb-4">
            Note: Only outsiders can register in groups.{' '}
            {IS_PRE_SPEAKER_PERIOD
              ? 'During the pre-speaker period, all registrations must be individual.'
              : 'Ateneans, scholars, and AMA members are limited to individual registration.'}
          </div>
          <RadioGroup
            value={
              formData.is_scholar_or_ama
                ? 'scholar_ama'
                : formData.is_atenean
                ? 'atenean'
                : 'none'
            }
            onValueChange={handleDiscountChange}
            className="space-y-6"
          >
            <div className="flex items-start space-x-4 p-4 border border-gray-700 rounded-md hover:bg-white/5 transition-colors">
              <RadioGroupItem
                value="scholar_ama"
                id="is_scholar_or_ama"
                className="border-gray-600 text-red-500 mt-1"
              />
              <div className="space-y-1">
                <Label
                  htmlFor="is_scholar_or_ama"
                  className="font-medium text-white text-lg"
                >
                  Scholar / AMA Member
                </Label>
                <p className="text-sm text-gray-400">
                  {IS_PRE_SPEAKER_PERIOD
                    ? `Identity verification required. Pre-speaker ₱${PRE_SPEAKER_DISCOUNT} discount will be applied.`
                    : `₱${SCHOLAR_AMA_DISCOUNT} discount for scholars and AMA members. You'll need to provide proof of your status during registration.`}
                </p>
                <p className="text-sm text-red-500 mt-1">
                  Individual registration only
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border border-gray-700 rounded-md hover:bg-white/5 transition-colors">
              <RadioGroupItem
                value="atenean"
                id="is_atenean"
                className="border-gray-600 text-red-500 mt-1"
              />
              <div className="space-y-1">
                <Label
                  htmlFor="is_atenean"
                  className="font-medium text-white text-lg"
                >
                  Atenean
                </Label>
                <p className="text-sm text-gray-400">
                  {IS_PRE_SPEAKER_PERIOD
                    ? `ID verification required. Pre-speaker ₱${PRE_SPEAKER_DISCOUNT} discount will be applied.`
                    : `₱${ATENEAN_DISCOUNT} discount for Ateneo students, faculty, and staff. Please have your ID ready for verification.`}
                </p>
                <p className="text-sm text-red-500 mt-1">
                  Individual registration only
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border border-gray-700 rounded-md hover:bg-white/5 transition-colors">
              <RadioGroupItem
                value="none"
                id="no_discount"
                className="border-gray-600 text-red-500 mt-1"
              />
              <div className="space-y-1">
                <Label
                  htmlFor="no_discount"
                  className="font-medium text-white text-lg"
                >
                  Outsider
                </Label>
                <p className="text-sm text-gray-400">
                  {IS_PRE_SPEAKER_PERIOD
                    ? `Pre-speaker ₱${PRE_SPEAKER_DISCOUNT} discount will be applied.`
                    : 'Standard registration fee applies. No additional verification needed.'}
                </p>
                <p
                  className={`text-sm ${
                    IS_PRE_SPEAKER_PERIOD ? 'text-red-500' : 'text-green-500'
                  } mt-1`}
                >
                  {IS_PRE_SPEAKER_PERIOD
                    ? 'Individual registration only during pre-speaker period'
                    : 'Eligible for both individual and group registration'}
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
