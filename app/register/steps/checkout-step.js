'use client';

import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Users, User } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  SINGLE_TICKET_PRICE,
  GROUP_DISCOUNT_THRESHOLD,
  GROUP_DISCOUNT,
  SCHOLAR_AMA_DISCOUNT,
  ATENEAN_DISCOUNT,
  IS_PRE_SPEAKER_PERIOD,
  PRE_SPEAKER_DISCOUNT,
} from '@/app/config/config';

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

    if (IS_PRE_SPEAKER_PERIOD) {
      price = price - PRE_SPEAKER_DISCOUNT * totalAttendees;
    } else {
      if (totalAttendees >= GROUP_DISCOUNT_THRESHOLD) {
        price = price - GROUP_DISCOUNT;
      } else {
        if (formData.is_scholar_or_ama) {
          price = price - SCHOLAR_AMA_DISCOUNT * totalAttendees;
        } else if (formData.is_atenean) {
          price = price - ATENEAN_DISCOUNT * totalAttendees;
        }
      }
    }
    return price;
  };

  useEffect(() => {
    const totalAttendees =
      formData.registration_type === 'group' ? 1 + attendees.length : 1;
    const updatedPrice = calculateTotalPrice(totalAttendees);

    updateFormData({
      ...formData,
      cost: updatedPrice,
      additional_attendees:
        formData.registration_type === 'group' ? attendees : [],
    });
  }, [attendees]);

  const handleRegistrationTypeChange = (value) => {
    if (
      value === 'group' &&
      (formData.is_scholar_or_ama ||
        formData.is_atenean ||
        IS_PRE_SPEAKER_PERIOD)
    ) {
      return;
    }

    const totalAttendees = value === 'group' ? 1 + attendees.length : 1;

    const updatedFormData = {
      ...formData,
      registration_type: value,
      is_scholar_or_ama: value === 'group' ? false : formData.is_scholar_or_ama,
      additional_attendees: value === 'group' ? attendees : [],
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
      id: attendees.length + 1,
      first_name: '',
      last_name: '',
      email: '',
      age: '',
      occupation: '',
      phone: '',
      attended_before: false,
      is_scholar_or_ama: false,
      is_atenean: false,
      school: '',
      year_and_course: '',
    };

    const newAttendees = [...attendees, newAttendee];
    setAttendees(newAttendees);

    if (formData.registration_type === 'group') {
      updateFormData({
        ...formData,
        additional_attendees: newAttendees,
      });
    }
  };

  const removeAttendee = (id) => {
    const newAttendees = attendees.filter((a) => a.id !== id);
    setAttendees(newAttendees);

    if (formData.registration_type === 'group') {
      updateFormData({
        ...formData,
        additional_attendees: newAttendees,
      });
    }
  };

  const updateAttendee = (id, field, value) => {
    const newAttendees = attendees.map((a) =>
      a.id === id ? { ...a, [field]: value } : a
    );

    setAttendees(newAttendees);

    if (formData.registration_type === 'group') {
      updateFormData({
        ...formData,
        additional_attendees: newAttendees,
      });
    }
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
                ₱{SINGLE_TICKET_PRICE}
              </div>
            </div>
          </div>

          <div
            className={`flex items-start space-x-3 p-5 border border-gray-700 rounded-md transition-colors ${
              formData.is_scholar_or_ama ||
              formData.is_atenean ||
              IS_PRE_SPEAKER_PERIOD
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-white/5'
            }`}
          >
            <RadioGroupItem
              value="group"
              id="registration-group"
              className="mt-1 border-gray-600 text-indigo-500"
              disabled={
                formData.is_scholar_or_ama ||
                formData.is_atenean ||
                IS_PRE_SPEAKER_PERIOD
              }
            />
            <div className="space-y-1 flex-1">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <Label
                  htmlFor="registration-group"
                  className={`font-medium ${
                    formData.is_scholar_or_ama ||
                    formData.is_atenean ||
                    IS_PRE_SPEAKER_PERIOD
                      ? 'text-gray-500'
                      : 'text-white'
                  }`}
                >
                  Group Registration
                </Label>
              </div>
              <div className="text-sm text-gray-400">
                Register multiple attendees to qualify for group discount
              </div>
              <div className="font-medium text-right text-indigo-400">
                ₱{SINGLE_TICKET_PRICE} × number of attendees
              </div>
              {IS_PRE_SPEAKER_PERIOD ? (
                <div className="text-sm text-red-500 mt-1">
                  Group registration is not available during the pre-speaker
                  discount period
                </div>
              ) : (
                (formData.is_scholar_or_ama || formData.is_atenean) && (
                  <div className="text-sm text-red-500 mt-1">
                    Group registration is not available for Ateneans, scholars,
                    or AMA members
                  </div>
                )
              )}
            </div>
          </div>
        </RadioGroup>
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
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor={`attendee-${attendee.id}-age`}
                        className="text-gray-300"
                      >
                        Age
                      </Label>
                      <Input
                        id={`attendee-${attendee.id}-age`}
                        type="number"
                        value={attendee.age || ''}
                        onChange={(e) =>
                          updateAttendee(attendee.id, 'age', e.target.value)
                        }
                        required
                        className="bg-white/10 border-gray-700 text-white py-3"
                        placeholder="Age"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`attendee-${attendee.id}-occupation`}
                        className="text-gray-300"
                      >
                        Occupation
                      </Label>
                      <Input
                        id={`attendee-${attendee.id}-occupation`}
                        value={attendee.occupation || ''}
                        onChange={(e) =>
                          updateAttendee(
                            attendee.id,
                            'occupation',
                            e.target.value
                          )
                        }
                        required
                        className="bg-white/10 border-gray-700 text-white py-3"
                        placeholder="Profession"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`attendee-${attendee.id}-phone`}
                      className="text-gray-300"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id={`attendee-${attendee.id}-phone`}
                      type="tel"
                      value={attendee.phone || ''}
                      onChange={(e) =>
                        updateAttendee(attendee.id, 'phone', e.target.value)
                      }
                      required
                      className="bg-white/10 border-gray-700 text-white py-3"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-3 bg-white/5 p-5 rounded-md">
                    <Label className="text-gray-300">
                      Has this person attended a TEDx event before?
                    </Label>
                    <RadioGroup
                      value={attendee.attended_before ? 'yes' : 'no'}
                      onValueChange={(value) =>
                        updateAttendee(
                          attendee.id,
                          'attended_before',
                          value === 'yes'
                        )
                      }
                      className="flex space-x-4 pt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="yes"
                          id={`attended-yes-${attendee.id}`}
                          className="border-gray-600 text-red-500"
                        />
                        <Label
                          htmlFor={`attended-yes-${attendee.id}`}
                          className="text-gray-300"
                        >
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="no"
                          id={`attended-no-${attendee.id}`}
                          className="border-gray-600 text-red-500"
                        />
                        <Label
                          htmlFor={`attended-no-${attendee.id}`}
                          className="text-gray-300"
                        >
                          No
                        </Label>
                      </div>
                    </RadioGroup>
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
            <span>₱{SINGLE_TICKET_PRICE * totalAttendees}</span>
          </div>

          {IS_PRE_SPEAKER_PERIOD ? (
            <div className="flex justify-between text-green-400">
              <span>
                Pre-speaker Discount (₱{PRE_SPEAKER_DISCOUNT} off per person)
              </span>
              <span>-₱{PRE_SPEAKER_DISCOUNT * totalAttendees}</span>
            </div>
          ) : (
            <>
              {isEligibleForDiscount && (
                <div className="flex justify-between text-green-400">
                  <span>Group Discount (₱{GROUP_DISCOUNT} off)</span>
                  <span>-₱{GROUP_DISCOUNT}</span>
                </div>
              )}

              {!isEligibleForDiscount && formData.is_scholar_or_ama && (
                <div className="flex justify-between text-green-400">
                  <span>
                    Scholar/AMA Discount (₱{SCHOLAR_AMA_DISCOUNT} off per
                    person)
                  </span>
                  <span>-₱{SCHOLAR_AMA_DISCOUNT * totalAttendees}</span>
                </div>
              )}

              {!isEligibleForDiscount &&
                formData.is_atenean &&
                !formData.is_scholar_or_ama && (
                  <div className="flex justify-between text-green-400">
                    <span>
                      Atenean Discount (₱{ATENEAN_DISCOUNT} off per person)
                    </span>
                    <span>-₱{ATENEAN_DISCOUNT * totalAttendees}</span>
                  </div>
                )}
            </>
          )}

          <div className="border-t border-indigo-700 pt-3 mt-3 flex justify-between font-bold text-white">
            <span>Total</span>
            <span>₱{totalPrice.toFixed(2)}</span>
          </div>

          <div className="text-sm text-gray-400 pt-3 text-bold">
            Payment will be collected after your application is approved. You'll
            receive payment instructions by email.
          </div>
        </div>
      </div>

      <div className="bg-white/5 p-4 rounded-md flex items-center gap-3">
        <Checkbox
          id="accept-terms"
          checked={formData.accepted_terms}
          onCheckedChange={handleTermsChange}
          required
          className="border-gray-600 text-indigo-500"
        />
        <Label htmlFor="accept-terms" className="text-gray-300 cursor-pointer">
          I understand that TEDx AteneodeManilaU requires a registration fee and
          agree to proceed with my application.
        </Label>
        {errors.accepted_terms && (
          <p className="text-sm text-red-500 mt-2">{errors.accepted_terms}</p>
        )}
      </div>

      <div className="bg-white/5 p-6 rounded-md border border-gray-800">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium text-white">Total Price</div>
            <div className="text-2xl font-bold text-indigo-400">
              ₱{totalPrice.toFixed(2)}
            </div>
          </div>
          {IS_PRE_SPEAKER_PERIOD ? (
            <div className="text-sm text-green-400">
              Pre-speaker discount of ₱{PRE_SPEAKER_DISCOUNT} per person
              applied!
            </div>
          ) : (
            <>
              {isEligibleForDiscount && (
                <div className="text-sm text-green-400">
                  Group discount of ₱{GROUP_DISCOUNT} applied for registering 3
                  or more attendees!
                </div>
              )}
              {!isEligibleForDiscount && formData.is_scholar_or_ama && (
                <div className="text-sm text-green-400">
                  Scholar/AMA member discount of ₱{SCHOLAR_AMA_DISCOUNT}{' '}
                  applied!
                </div>
              )}
              {!isEligibleForDiscount &&
                formData.is_atenean &&
                !formData.is_scholar_or_ama && (
                  <div className="text-sm text-green-400">
                    Atenean discount of ₱{ATENEAN_DISCOUNT} applied!
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
