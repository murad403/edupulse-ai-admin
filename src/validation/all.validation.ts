import z from "zod";

export const schoolSchema = z.object({
  schoolName: z.string().min(1, { message: 'School name is required' }),
  region: z.string().min(1, { message: 'Region / District Office is required.' })
})
export type TSchoolForm = z.infer<typeof schoolSchema>


export const teacherSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  email: z.string().min(1, "Email is required").email({ message: 'Please enter a valid professional email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
  schoolId: z.string().min(1, { message: 'School affiliation is required.' }),
  grade: z.string().min(1, { message: 'Grade is required.' }),
  status: z.enum(['approved', 'pending'])
})
export type TTeacherForm = z.infer<typeof teacherSchema>

export const reportSchema = z.object({
  analyticalFocus: z.string().min(1, { message: 'Analytical Focus is required.' }),
  targetSchoolRange: z.coerce.number({ error: 'Target School Range must be a number.' }).int().min(1, { message: 'Must be at least 1.' }),
  temporalBounds: z.coerce.number({ error: 'Temporal Bounds must be a number.' }).int().min(1, { message: 'Must be at least 1.' })
})
export type TReportForm = z.infer<typeof reportSchema>

export const editUserSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  email: z.string().optional(),
  schoolName: z.string().optional(),
  grade: z.string().min(1, { message: 'Grade is required.' }),
  room: z.string().optional()
})
export type TEditUserForm = z.infer<typeof editUserSchema>