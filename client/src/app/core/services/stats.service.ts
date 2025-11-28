import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { QuickStatsSuccessRes, RoomStatsSuccessRes, StudentStatsSuccessRes } from "@core/models/stats";
import { TeacherStatsSuccessRes } from "app/features/teachers/models";

@Injectable({providedIn: "root"})
export class StatsService extends BaseService {
 override baseUrl = `${this.apiUrl}/stats`

 getQuickStats(): Observable<QuickStatsSuccessRes> {
  return this.http.get<QuickStatsSuccessRes>(`${this.baseUrl}/quick`)
 }

 getRoomStats(): Observable<RoomStatsSuccessRes> {
  return this.http.get<RoomStatsSuccessRes>(`${this.baseUrl}/room`)
 }

 getStudentStats(): Observable<StudentStatsSuccessRes> {
  return this.http.get<StudentStatsSuccessRes>(`${this.baseUrl}/student`)
 }

 getTeacherStats(): Observable<TeacherStatsSuccessRes> {
  return this.http.get<TeacherStatsSuccessRes>(`${this.baseUrl}/teacher`)
 }
}
