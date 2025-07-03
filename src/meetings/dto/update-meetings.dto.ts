export class UpdateMeetingDto {
  readonly clientName?: string;
  readonly clientEmail?: string;
  readonly date?: Date;
  readonly startTime?: string;
  readonly endTime?: string;
  readonly notes?: string;
  readonly serviceId?: number;
}
