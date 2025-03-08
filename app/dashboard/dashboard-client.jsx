'use client';

import { useState } from 'react';
import { updateSubmissionStatus } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Stats } from './components/stats';
import { Filters } from './components/filters';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ResponseViewer } from './components/response-viewer';
import { toast } from 'sonner';

const ITEMS_PER_PAGE = 10;

export function DashboardClient({ initialSubmissions }) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState(true);

  async function handleStatusUpdate(id, status) {
    try {
      await updateSubmissionStatus(id, status);
      setSelectedSubmission(null);
      setSubmissions(
        submissions.map((sub) => (sub.id === id ? { ...sub, status } : sub))
      );
      toast(`Application ${status}`, {
        description: `The application has been ${status} successfully.`,
      });
    } catch (error) {
      toast('Failed to update status', {
        description: `Could not update application status: ${error}`,
      });
    }
  }

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      search === '' ||
      `${submission.first_name} ${submission.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      submission.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === 'all' || submission.status === status;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE);
  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto py-32 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => setView(!view)}>
          {view ? 'View Pending & Summary' : 'View Stats'}
        </Button>
      </div>
      {view ? (
        <>
          <Stats submissions={submissions} />
          <Card>
            <CardHeader>
              <CardTitle>Application Submissions</CardTitle>
              <CardDescription>
                Review and manage application submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Filters
                  search={search}
                  onSearchChange={setSearch}
                  status={status}
                  onStatusChange={setStatus}
                />

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell>
                            {new Date(
                              `${submission.created_at}`
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {submission.first_name} {submission.last_name}
                          </TableCell>
                          <TableCell>{submission.email}</TableCell>
                          <TableCell>
                            <span
                              className={
                                submission.status === 'approved'
                                  ? 'text-green-600'
                                  : submission.status === 'rejected'
                                  ? 'text-red-600'
                                  : 'text-yellow-600'
                              }
                            >
                              {submission.status.charAt(0).toUpperCase() +
                                submission.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              onClick={() => setSelectedSubmission(submission)}
                            >
                              Review
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Dialog
                  open={!!selectedSubmission}
                  onOpenChange={() => setSelectedSubmission(null)}
                >
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Review Application</DialogTitle>
                      <DialogDescription>
                        Review the full application
                      </DialogDescription>
                    </DialogHeader>
                    {selectedSubmission && (
                      <div className="space-y-4">
                        <p>
                          <strong>Reference No:</strong>{' '}
                          {selectedSubmission.reference_no}
                        </p>
                        <p>
                          <strong>Phone:</strong> {selectedSubmission.phone}
                        </p>
                        <p>
                          <strong>Age:</strong> {selectedSubmission.age}
                        </p>
                        <p>
                          <strong>Occupation:</strong>{' '}
                          {selectedSubmission.occupation}
                        </p>
                        <p>
                          <strong>School Info:</strong>{' '}
                          {selectedSubmission.school_info}
                        </p>
                        <p>
                          <strong>Cost:</strong> ${selectedSubmission.cost}
                        </p>
                        <p>
                          <strong>Registration Type:</strong>{' '}
                          {selectedSubmission.registration_type}
                        </p>
                        <p>
                          <strong>Additional Attendees:</strong>
                        </p>
                        {selectedSubmission.registration_type === 'group' && (
                          <ul className="list-disc pl-4">
                            {JSON.parse(
                              selectedSubmission?.additional_attendees
                            ).map((attendee) => (
                              <li key={attendee.id}>
                                {attendee.first_name} {attendee.last_name} -{' '}
                                {attendee.email}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() =>
                              handleStatusUpdate(
                                selectedSubmission.id,
                                'rejected'
                              )
                            }
                          >
                            Reject
                          </Button>
                          <Button
                            onClick={() =>
                              handleStatusUpdate(
                                selectedSubmission.id,
                                'approved'
                              )
                            }
                          >
                            Approve
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <ResponseViewer submissions={submissions} />
      )}
    </div>
  );
}
