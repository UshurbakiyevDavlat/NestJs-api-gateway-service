export class CreateEmployeeAdditionsDto {
  readonly departmentId: number;
  readonly positionId: number;
  readonly levelId: number;
  readonly headId: number;
  readonly contractId: number;
  readonly workFormatId: number;
  readonly medCertStatus: number;
  readonly salaryAfterProbation: string;
  readonly startDate: Date;
  readonly periodProbation: Date;
}
