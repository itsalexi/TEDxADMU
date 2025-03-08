'use client';

import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Users, User } from 'lucide-react';

const SINGLE_TICKET_PRICE = 99;
const GROUP_DISCOUNT_THRESHOLD = 3;
const GROUP_DISCOUNT_PERCENTAGE = 15;
const SCHOLAR_AMA_DISCOUNT_PERCENTAGE = 20;

export default function CheckoutStep({
  formData,
  updateFormData,
  errors = {},
}) {
  const [attendees, setAttendees] = useState(
    formData.additional_attendees || []
  );

  console.log(formData);

  const calculateTotalPrice = (totalAttendees) => {
    let price = SINGLE_TICKET_PRICE * totalAttendees;
    if (totalAttendees >= GROUP_DISCOUNT_THRESHOLD) {
      price = price * (1 - GROUP_DISCOUNT_PERCENTAGE / 100);
    } else if (formData.is_scholar_or_ama) {
      // Only apply scholar/AMA discount for individual registrations
      price = price * (1 - SCHOLAR_AMA_DISCOUNT_PERCENTAGE / 100);
    }
    return price;
  };

  useEffect(() => {
    const totalAttendees = formData.registration_type === 'group' ? 1 + attendees.length : 1;
    const updatedPrice = calculateTotalPrice(totalAttendees);

    updateFormData({
      ...formData,
      cost: updatedPrice,
    });
  }, [attendees]);

  const handleRegistrationTypeChange = (value) => {
    const totalAttendees = value === 'group' ? 1 + attendees.length : 1;
    
    // Reset scholar/AMA discount when switching to group registration
    const updatedFormData = {
      ...formData,
      registration_type: value,
      is_scholar_or_ama: value === 'group' ? false : formData.is_scholar_or_ama
    };

    const updatedPrice = calculateTotalPrice(totalAttendees);

    updateFormData({
      ...updatedFormData,
      cost: updatedPrice,
    });
  };

  const handleTermsChange = (checked) => {
    updateFormData({
      ...formData,
      accepted_terms: checked,
    });
  };

  const addAttendee = () => {
    const newAttendee = {
      id: Date.now(),
      first_name: '',
      last_name: '',
      email: '',
    };

    const newAttendees = [...attendees, newAttendee];
    setAttendees(newAttendees);

    updateFormData({
      ...formData,
      additional_attendees: newAttendees,
    });
  };

  const removeAttendee = (id) => {
    const newAttendees = attendees.filter((a) => a.id !== id);

    setAttendees(newAttendees);

    updateFormData({
      ...formData,
      additional_attendees: newAttendees,
    });
  };

  const updateAttendee = (id, field, value) => {
    const newAttendees = attendees.map((a) =>
      a.id === id ? { ...a, [field]: value } : a
    );

    setAttendees(newAttendees);

    updateFormData({
      ...formData,
      additional_attendees: newAttendees,
    });
  };

  const totalAttendees =
    formData.registration_type === 'group' ? 1 + attendees.length : 1;
  const isEligibleForDiscount = totalAttendees >= GROUP_DISCOUNT_THRESHOLD;

  let totalPrice = calculateTotalPrice(totalAttendees);

  return (
    <div className="space-y-8">

      <div className="bg-white/5 p-6 rounded-md border border-gray-800">
        <div className="text-lg font-medium mb-4 text-white">
          Registration Options
        </div>

        <RadioGroup
          value={formData.registration_type}
          onValueChange={handleRegistrationTypeChange}
          className="space-y-4"
        >
          <div className="flex items-start space-x-3 p-5 border border-gray-700 rounded-md hover:bg-white/5 transition-colors">
            <RadioGroupItem
              value="single"
              id="registration-single"
              className="mt-1 border-gray-600 text-indigo-500"
            />
            <div className="space-y-1 flex-1">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                <Label
                  htmlFor="registration-single"
                  className="font-medium text-white"
                >
                  Individual Registration
                </Label>
              </div>
              <div className="text-sm text-gray-400">
                Standard attendee registration for one person
              </div>
              <div className="font-medium text-right text-indigo-400">
                ${SINGLE_TICKET_PRICE}
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-5 border border-gray-700 rounded-md hover:bg-white/5 transition-colors">
            <RadioGroupItem
              value="group"
              id="registration-group"
              className="mt-1 border-gray-600 text-indigo-500"
            />
            <div className="space-y-1 flex-1">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <Label
                  htmlFor="registration-group"
                  className="font-medium text-white"
                >
                  Group Registration
                </Label>
              </div>
              <div className="text-sm text-gray-400">
                Register with friends and save {GROUP_DISCOUNT_PERCENTAGE}% when
                you register 3 or more attendees!
              </div>
              <div className="font-medium text-right text-indigo-400">
                ${SINGLE_TICKET_PRICE} per person
              </div>
            </div>
          </div>
        </RadioGroup>

        {formData.registration_type === 'single' && (
          <div className="mt-4 flex items-center space-x-3 p-4 border border-gray-700 rounded-md">
            <Checkbox
              id="scholar_ama"
              checked={formData.is_scholar_or_ama}
              onCheckedChange={(checked) => {
                updateFormData({
                  ...formData,
                  is_scholar_or_ama: checked,
                });
              }}
              className="border-gray-600 text-indigo-500"
            />
            <div className="space-y-1">
              <Label htmlFor="scholar_ama" className="font-medium text-white">
                Scholar / AMA Member Discount
              </Label>
              <p className="text-sm text-gray-400">
                {SCHOLAR_AMA_DISCOUNT_PERCENTAGE}% discount for scholars and AMA members (Individual registration only)
              </p>
            </div>
          </div>
        )}
      </div>

      {formData.registration_type === 'group' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-white">Additional Attendees</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addAttendee}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white border-none px-4 py-2"
            >
              <Plus className="h-4 w-4" /> Add Attendee
            </Button>
          </div>

          {attendees.length === 0 ? (
            <div className="text-sm text-gray-400 py-4 px-5 bg-white/5 rounded-md border border-gray-800">
              No additional attendees yet. Add attendees to qualify for group
              discount.
            </div>
          ) : (
            <div className="space-y-4">
              {attendees.map((attendee, index) => (
                <div
                  key={attendee.id}
                  className="p-5 border border-gray-700 rounded-md space-y-4 bg-white/5"
                >
                  <div className="flex justify-between">
                    <div className="font-medium text-white flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      Attendee #{index + 1}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttendee(attendee.id)}
                      className="h-8 w-8 p-0 hover:bg-red-900/20 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>

                  {errors.attendees && errors.attendees[attendee.id] && (
                    <div className="text-sm text-red-500 bg-red-900/20 p-3 rounded-md">
                      {errors.attendees[attendee.id]}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor={`attendee-${attendee.id}-first_name`}
                        className="text-gray-300"
                      >
                        First Name
                      </Label>
                      <Input
                        id={`attendee-${attendee.id}-first_name`}
                        value={attendee.first_name}
                        onChange={(e) =>
                          updateAttendee(
                            attendee.id,
                            'first_name',
                            e.target.value
                          )
                        }
                        required
                        className="bg-white/10 border-gray-700 text-white py-3"
                        placeholder="First name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`attendee-${attendee.id}-last_name`}
                        className="text-gray-300"
                      >
                        Last Name
                      </Label>
                      <Input
                        id={`attendee-${attendee.id}-last_name`}
                        value={attendee.last_name}
                        onChange={(e) =>
                          updateAttendee(
                            attendee.id,
                            'last_name',
                            e.target.value
                          )
                        }
                        required
                        className="bg-white/10 border-gray-700 text-white py-3"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`attendee-${attendee.id}-email`}
                      className="text-gray-300"
                    >
                      Email Address
                    </Label>
                    <Input
                      id={`attendee-${attendee.id}-email`}
                      type="email"
                      value={attendee.email}
                      onChange={(e) =>
                        updateAttendee(attendee.id, 'email', e.target.value)
                      }
                      required
                      className="bg-white/10 border-gray-700 text-white py-3"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="bg-indigo-900/20 p-6 rounded-md border border-indigo-800 shadow-lg">
        <div className="text-lg font-medium mb-4 text-white">
          Payment Summary
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-gray-300">
            <span>
              Registration Fee ({totalAttendees}{' '}
              {totalAttendees === 1 ? 'attendee' : 'attendees'})
            </span>
            <span>${SINGLE_TICKET_PRICE * totalAttendees}</span>
          </div>

          {isEligibleForDiscount && (
            <div className="flex justify-between text-green-400">
              <span>Group Discount ({GROUP_DISCOUNT_PERCENTAGE}%)</span>
              <span>
                -$
                {(
                  (SINGLE_TICKET_PRICE *
                    totalAttendees *
                    GROUP_DISCOUNT_PERCENTAGE) /
                  100
                ).toFixed(2)}
              </span>
            </div>
          )}

          {!isEligibleForDiscount && formData.is_scholar_or_ama && formData.registration_type === 'single' && (
            <div className="flex justify-between text-green-400">
              <span>Scholar/AMA Discount ({SCHOLAR_AMA_DISCOUNT_PERCENTAGE}%)</span>
              <span>
                -$
                {(
                  (SINGLE_TICKET_PRICE *
                    totalAttendees *
                    SCHOLAR_AMA_DISCOUNT_PERCENTAGE) /
                  100
                ).toFixed(2)}
              </span>
            </div>
          )}

          <div className="border-t border-indigo-700 pt-3 mt-3 flex justify-between font-bold text-white">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="text-sm text-gray-400 pt-3">
            Payment will be collected after your application is approved. You'll
            receive payment instructions by email.
          </div>
        </div>
      </div>

      <div className="pt-4 flex items-start space-x-3 bg-white/5 p-5 rounded-md">
        <Checkbox
          id="accept-terms"
          checked={formData.accepted_terms}
          onCheckedChange={handleTermsChange}
          required
          className="border-gray-600 text-indigo-500 mt-1"
        />
        <div className="space-y-1 leading-none">
          <Label
            htmlFor="accept-terms"
            className="text-gray-300 cursor-pointer"
          >
            I understand that TEDx Labyrinthine requires a registration fee of $
            {SINGLE_TICKET_PRICE} per person and agree to proceed with my
            application.
          </Label>
          {errors.accepted_terms && (
            <p className="text-sm text-red-500 mt-2">{errors.accepted_terms}</p>
          )}
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-md border border-gray-800">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium text-white">Total Price</div>
            <div className="text-2xl font-bold text-indigo-400">
              ${totalPrice.toFixed(2)}
            </div>
          </div>
          {isEligibleForDiscount && (
            <div className="text-sm text-green-400">
              Group discount of {GROUP_DISCOUNT_PERCENTAGE}% applied!
            </div>
          )}
          {!isEligibleForDiscount && formData.is_scholar_or_ama && formData.registration_type === 'single' && (
            <div className="text-sm text-green-400">
              Scholar/AMA member discount of {SCHOLAR_AMA_DISCOUNT_PERCENTAGE}% applied!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
