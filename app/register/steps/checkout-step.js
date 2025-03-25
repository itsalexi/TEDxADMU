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
  SCHOLAR_AMA_DISCOUNT,
  ATENEAN_DISCOUNT,
  IS_PRE_SPEAKER_PERIOD,
  PRE_SPEAKER_DISCOUNT,
  ATENEAN_AMA_BUNDLE_DISCOUNT,
  OUTSIDER_BUNDLE_DISCOUNT,
} from '@/app/config/config';

export default function CheckoutStep({
  formData,
  updateFormData,
  errors = {},
}) {
  const [attendees, setAttendees] = useState(
    formData.additional_attendees || []
  );

  const calculateTotalPrice = (totalAttendees) => {
    let price = SINGLE_TICKET_PRICE * totalAttendees;

    if (IS_PRE_SPEAKER_PERIOD) {
      price = price - PRE_SPEAKER_DISCOUNT * totalAttendees;
    } else {
      // Apply individual discounts for main registrant
      if (formData.is_scholar_or_ama) {
        price = price - SCHOLAR_AMA_DISCOUNT;
      } else if (formData.is_atenean) {
        price = price - ATENEAN_DISCOUNT;
      }

      // Apply individual discounts for additional attendees
      attendees.forEach((attendee) => {
        if (attendee.is_scholar_or_ama) {
          price = price - SCHOLAR_AMA_DISCOUNT;
        } else if (attendee.is_atenean) {
          price = price - ATENEAN_DISCOUNT;
        }
      });

      // Apply bundle discount for every group of 3
      if (totalAttendees >= GROUP_DISCOUNT_THRESHOLD) {
        const numberOfCompleteGroups = Math.floor(
          totalAttendees / GROUP_DISCOUNT_THRESHOLD
        );
        const bundleDiscountAmount =
          formData.is_scholar_or_ama || formData.is_atenean
            ? ATENEAN_AMA_BUNDLE_DISCOUNT
            : OUTSIDER_BUNDLE_DISCOUNT;
        price = price - bundleDiscountAmount * numberOfCompleteGroups;
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
    if (value === 'group' && IS_PRE_SPEAKER_PERIOD) {
      return;
    }

    const totalAttendees = value === 'group' ? 1 + attendees.length : 1;

    const updatedFormData = {
      ...formData,
      registration_type: value,
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
    if (attendees.length >= 2) {
      return; // Don't add more if already at max
    }

    // Generate a unique ID using timestamp and random number
    const uniqueId = Date.now() + Math.random().toString(36).substr(2, 9);

    const newAttendee = {
      id: uniqueId,
      first_name: '',
      last_name: '',
      email: '',
      age: '',
      occupation: '',
      phone: '',
      attended_before: false,
      is_scholar_or_ama: formData.is_scholar_or_ama,
      is_atenean: formData.is_atenean,
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
  const isEligibleForBundle = totalAttendees >= GROUP_DISCOUNT_THRESHOLD;
  const bundleDiscount =
    formData.is_scholar_or_ama || formData.is_atenean
      ? ATENEAN_AMA_BUNDLE_DISCOUNT
      : OUTSIDER_BUNDLE_DISCOUNT;

  let totalPrice = calculateTotalPrice(totalAttendees);

  return (
    <div className="space-y-8">
      {(errors.attendees || errors.accepted_terms) && (
        <div className="bg-red-900/20 border border-red-800 rounded-md p-4">
          <h3 className="text-red-400 font-medium mb-2">
            Please fix the following errors:
          </h3>
          <ul className="space-y-1 text-sm text-red-400">
            {errors.accepted_terms && <li>• {errors.accepted_terms}</li>}
            {errors.attendees &&
              Object.entries(errors.attendees).map(
                ([index, attendeeErrors]) => (
                  <li key={index}>
                    • Attendee #{parseInt(index) + 1} has the following errors:
                    <ul className="ml-4 mt-1 space-y-1">
                      {Object.entries(attendeeErrors).map(([field, error]) => (
                        <li key={field}>- {error}</li>
                      ))}
                    </ul>
                  </li>
                )
              )}
          </ul>
        </div>
      )}

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
              IS_PRE_SPEAKER_PERIOD
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-white/5'
            }`}
          >
            <RadioGroupItem
              value="group"
              id="registration-group"
              className="mt-1 border-gray-600 text-indigo-500"
              disabled={IS_PRE_SPEAKER_PERIOD}
            />
            <div className="space-y-1 flex-1">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <Label
                  htmlFor="registration-group"
                  className={`font-medium ${
                    IS_PRE_SPEAKER_PERIOD ? 'text-gray-500' : 'text-white'
                  }`}
                >
                  Group Registration
                </Label>
              </div>
              <div className="text-sm text-gray-400">
                Register as a group of 3 to get the bundle discount
              </div>
              <div className="font-medium text-right text-indigo-400">
                ₱{SINGLE_TICKET_PRICE} × number of attendees
              </div>
              {IS_PRE_SPEAKER_PERIOD ? (
                <div className="text-sm text-red-500 mt-1">
                  Group registration not available during Early Bird Promo
                </div>
              ) : (
                <div className="text-sm text-green-500 mt-1">
                  {formData.is_scholar_or_ama || formData.is_atenean
                    ? `₱${ATENEAN_AMA_BUNDLE_DISCOUNT} bundle discount for 3 attendees`
                    : `₱${OUTSIDER_BUNDLE_DISCOUNT} bundle discount for 3 attendees`}
                </div>
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
              disabled={attendees.length >= 2}
              className={`flex items-center gap-1 ${
                attendees.length >= 2
                  ? 'bg-gray-600 hover:bg-gray-600 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white border-none px-4 py-2`}
            >
              <Plus className="h-4 w-4" /> Add Attendee{' '}
              {attendees.length >= 2 && '(Max 2)'}
            </Button>
          </div>

          {attendees.length === 0 ? (
            <div className="text-sm text-gray-400 py-4 px-5 bg-white/5 rounded-md border border-gray-800">
              No additional attendees yet. You can add up to 2 additional
              attendees.
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
                      {Object.entries(errors.attendees[attendee.id]).map(
                        ([field, error]) => (
                          <p key={field}>{error}</p>
                        )
                      )}
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
                        className={`bg-white/10 border-gray-700 text-white py-3 ${
                          errors.attendees?.[index]?.first_name
                            ? 'border-red-500'
                            : ''
                        }`}
                        placeholder="First name"
                      />
                      {errors.attendees?.[index]?.first_name && (
                        <p className="text-sm text-red-500">
                          {errors.attendees[index].first_name}
                        </p>
                      )}
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
                        className={`bg-white/10 border-gray-700 text-white py-3 ${
                          errors.attendees?.[index]?.last_name
                            ? 'border-red-500'
                            : ''
                        }`}
                        placeholder="Last name"
                      />
                      {errors.attendees?.[index]?.last_name && (
                        <p className="text-sm text-red-500">
                          {errors.attendees[index].last_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`attendee-${attendee.id}-email`}
                      className="text-gray-300"
                    >
                      Email Address{' '}
                      {(formData.is_atenean || formData.is_scholar_or_ama) && (
                        <span className="text-red-500">
                          *must be an ateneo.edu email
                        </span>
                      )}
                    </Label>
                    <Input
                      id={`attendee-${attendee.id}-email`}
                      type="email"
                      value={attendee.email}
                      onChange={(e) =>
                        updateAttendee(attendee.id, 'email', e.target.value)
                      }
                      required
                      className={`bg-white/10 border-gray-700 text-white py-3 ${
                        errors.attendees?.[index]?.email ? 'border-red-500' : ''
                      }`}
                      placeholder={
                        formData.is_atenean || formData.is_scholar_or_ama
                          ? 'your.name@student.ateneo.edu (or other ateneo.edu domain)'
                          : 'your.email@example.com'
                      }
                    />
                    {errors.attendees?.[index]?.email && (
                      <p className="text-sm text-red-500">
                        {errors.attendees[index].email}
                      </p>
                    )}
                    {(formData.is_atenean || formData.is_scholar_or_ama) && (
                      <p className="text-xs text-gray-500 mt-1">
                        Accepts any ateneo.edu email domain (e.g.,
                        student.ateneo.edu, obf.ateneo.edu)
                      </p>
                    )}
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
                        className={`bg-white/10 border-gray-700 text-white py-3 ${
                          errors.attendees?.[index]?.age ? 'border-red-500' : ''
                        }`}
                        placeholder="Age"
                      />
                      {errors.attendees?.[index]?.age && (
                        <p className="text-sm text-red-500">
                          {errors.attendees[index].age}
                        </p>
                      )}
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
                        className={`bg-white/10 border-gray-700 text-white py-3 ${
                          errors.attendees?.[index]?.occupation
                            ? 'border-red-500'
                            : ''
                        }`}
                        placeholder="Profession"
                      />
                      {errors.attendees?.[index]?.occupation && (
                        <p className="text-sm text-red-500">
                          {errors.attendees[index].occupation}
                        </p>
                      )}
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
                      className={`bg-white/10 border-gray-700 text-white py-3 ${
                        errors.attendees?.[index]?.phone ? 'border-red-500' : ''
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.attendees?.[index]?.phone && (
                      <p className="text-sm text-red-500">
                        {errors.attendees[index].phone}
                      </p>
                    )}
                  </div>

                  {(formData.is_atenean || formData.is_scholar_or_ama) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor={`attendee-${attendee.id}-school`}
                          className="text-gray-300"
                        >
                          School
                        </Label>
                        <Select
                          value={attendee.school}
                          onValueChange={(value) =>
                            updateAttendee(attendee.id, 'school', value)
                          }
                        >
                          <SelectTrigger
                            className={`bg-white/10 border-gray-700 text-white py-3 ${
                              errors.attendees?.[index]?.school
                                ? 'border-red-500'
                                : ''
                            }`}
                          >
                            <SelectValue placeholder="Select school" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SOSE">
                              School of Science and Engineering (SOSE)
                            </SelectItem>
                            <SelectItem value="SOSS">
                              School of Social Sciences (SOSS)
                            </SelectItem>
                            <SelectItem value="SOH">
                              School of Humanities (SOH)
                            </SelectItem>
                            <SelectItem value="JGSOM">
                              School of Management (JGSOM)
                            </SelectItem>
                            <SelectItem value="GBSEALD">
                              School of Education and Learning Design (GBSEALD)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.attendees?.[index]?.school && (
                          <p className="text-sm text-red-500">
                            {errors.attendees[index].school}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor={`attendee-${attendee.id}-year_and_course`}
                          className="text-gray-300"
                        >
                          Year and Course
                        </Label>
                        <Input
                          id={`attendee-${attendee.id}-year_and_course`}
                          value={attendee.year_and_course || ''}
                          onChange={(e) =>
                            updateAttendee(
                              attendee.id,
                              'year_and_course',
                              e.target.value
                            )
                          }
                          required={
                            formData.is_atenean || formData.is_scholar_or_ama
                          }
                          placeholder="e.g., 3 BS Computer Science"
                          className={`bg-white/10 border-gray-700 text-white py-3 ${
                            errors.attendees?.[index]?.year_and_course
                              ? 'border-red-500'
                              : ''
                          }`}
                        />
                        {errors.attendees?.[index]?.year_and_course && (
                          <p className="text-sm text-red-500">
                            {errors.attendees[index].year_and_course}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Format: Year followed by Course (e.g., 2 BS
                          Management, 4 AB Literature)
                        </p>
                      </div>
                    </div>
                  )}

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

                  {(formData.is_scholar_or_ama || formData.is_atenean) && (
                    <div className="space-y-3 bg-white/5 p-5 rounded-md">
                      <Label className="text-gray-300">
                        Discount Eligibility
                      </Label>
                      <RadioGroup
                        value={
                          attendee.is_scholar_or_ama
                            ? 'scholar_ama'
                            : attendee.is_atenean
                            ? 'atenean'
                            : 'none'
                        }
                        onValueChange={(value) => {
                          const isScholarOrAma = value === 'scholar_ama';
                          const isAtenean = value === 'atenean';
                          const newAttendees = attendees.map((a) =>
                            a.id === attendee.id
                              ? {
                                  ...a,
                                  is_scholar_or_ama: isScholarOrAma,
                                  is_atenean: isAtenean,
                                }
                              : a
                          );
                          setAttendees(newAttendees);
                          if (formData.registration_type === 'group') {
                            updateFormData({
                              ...formData,
                              additional_attendees: newAttendees,
                            });
                          }
                        }}
                        className="flex space-x-4 pt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="scholar_ama"
                            id={`scholar-ama-${attendee.id}`}
                            className="border-gray-600 text-red-500"
                          />
                          <Label
                            htmlFor={`scholar-ama-${attendee.id}`}
                            className="text-gray-300"
                          >
                            Scholar / AMA Member
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="atenean"
                            id={`atenean-${attendee.id}`}
                            className="border-gray-600 text-red-500"
                          />
                          <Label
                            htmlFor={`atenean-${attendee.id}`}
                            className="text-gray-300"
                          >
                            Atenean
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="none"
                            id={`no-discount-${attendee.id}`}
                            className="border-gray-600 text-red-500"
                            disabled={
                              formData.is_scholar_or_ama || formData.is_atenean
                            }
                          />
                          <Label
                            htmlFor={`no-discount-${attendee.id}`}
                            className={`text-gray-300 ${
                              formData.is_scholar_or_ama || formData.is_atenean
                                ? 'text-gray-500'
                                : ''
                            }`}
                          >
                            None
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
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
                Early Bird Promo (₱{PRE_SPEAKER_DISCOUNT} off per person)
              </span>
              <span>-₱{PRE_SPEAKER_DISCOUNT * totalAttendees}</span>
            </div>
          ) : (
            <>
              {/* Count discounts by type */}
              {(() => {
                const scholarAmaCount =
                  attendees.filter((a) => a.is_scholar_or_ama).length +
                  (formData.is_scholar_or_ama ? 1 : 0);
                const ateneanCount =
                  attendees.filter((a) => a.is_atenean).length +
                  (formData.is_atenean ? 1 : 0);

                return (
                  <>
                    {scholarAmaCount > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Scholar/AMA Discount ({scholarAmaCount}x)</span>
                        <span>-₱{SCHOLAR_AMA_DISCOUNT * scholarAmaCount}</span>
                      </div>
                    )}
                    {ateneanCount > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Atenean Discount ({ateneanCount}x)</span>
                        <span>-₱{ATENEAN_DISCOUNT * ateneanCount}</span>
                      </div>
                    )}
                  </>
                );
              })()}

              {/* Bundle discount */}
              {isEligibleForBundle && (
                <div className="flex justify-between text-green-400">
                  <span>
                    Bundle Discount (
                    {formData.is_scholar_or_ama || formData.is_atenean
                      ? 'Atenean/AMA/Scholar'
                      : 'Outsider'}{' '}
                    Group of 3)
                  </span>
                  <span>-₱{bundleDiscount}</span>
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
        </div>
      </div>
    </div>
  );
}
