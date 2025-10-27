import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { PageTitleComponent } from "../../shared/components/page-title.component/page-title.component";
import { Button } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputNumber } from "primeng/inputnumber";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { GeneralComponent } from './components/general/general.component';
import { AcademicComponent } from './components/academic/academic.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SecurityComponent } from './components/security/security.component';
import { AppearanceComponent } from './components/appearance/appearance.component';

interface SchoolInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  logo: string;
}

@Component({
  selector: 'school-settings',
  imports: [PageTitleComponent, DropdownModule,
            SecurityComponent, FormsModule, CommonModule,
            NotificationComponent, InputTextModule, GeneralComponent, AcademicComponent, AppearanceComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {

  activeTab: string = 'general';

  // School Information
  schoolInfo: SchoolInfo = {
    name: 'Lincoln High School',
    email: 'info@lincolnhigh.edu',
    phone: '+1 234-567-8900',
    address: '123 Education Street, City, State 12345',
    website: 'www.lincolnhigh.edu',
    logo: ''
  };

  // Academic Settings
  academicYear: string = '2024-2025';
  gradeSystem: string = 'gpa';
  passingGrade: number = 60;



  // Notification Settings
  emailNotifications: boolean = true;
  smsNotifications: boolean = false;
  pushNotifications: boolean = true;
  attendanceAlerts: boolean = true;
  gradeAlerts: boolean = true;
  announcementAlerts: boolean = true;

  // Security Settings
  twoFactorAuth: boolean = false;
  sessionTimeout: number = 30;
  passwordExpiry: number = 90;



  // Appearance Settings
  theme: string = 'light';
  language: string = 'en';
  dateFormat: string = 'MM/DD/YYYY';

  ngOnInit(): void {
    // Load settings from service
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  saveGeneralSettings(): void {
    console.log('Saving general settings...', this.schoolInfo);
    // Save logic here
  }













}
