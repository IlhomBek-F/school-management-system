import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { PageTitleComponent } from "../../shared/components/page-title.component/page-title.component";
import { Button } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputNumber } from "primeng/inputnumber";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

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
  imports: [PageTitleComponent, Button, DropdownModule, InputNumber, FormsModule, CommonModule, InputTextModule],
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

  gradeSystemOptions = [
    { label: 'GPA (0-4.0)', value: 'gpa' },
    { label: 'Percentage (0-100)', value: 'percentage' },
    { label: 'Letter Grades (A-F)', value: 'letter' }
  ];

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

  timeoutOptions = [
    { label: '15 minutes', value: 15 },
    { label: '30 minutes', value: 30 },
    { label: '1 hour', value: 60 },
    { label: '2 hours', value: 120 }
  ];

  // Appearance Settings
  theme: string = 'light';
  language: string = 'en';
  dateFormat: string = 'MM/DD/YYYY';

  themeOptions = [
    { label: 'Light Mode', value: 'light' },
    { label: 'Dark Mode', value: 'dark' },
    { label: 'Auto', value: 'auto' }
  ];

  languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' }
  ];

  dateFormatOptions = [
    { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
    { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
    { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' }
  ];

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

  saveAcademicSettings(): void {
    console.log('Saving academic settings...');
    // Save logic here
  }

  saveNotificationSettings(): void {
    console.log('Saving notification settings...');
    // Save logic here
  }

  saveSecuritySettings(): void {
    console.log('Saving security settings...');
    // Save logic here
  }

  saveAppearanceSettings(): void {
    console.log('Saving appearance settings...');
    // Save logic here
  }

  uploadLogo(event: any): void {
    console.log('Logo upload:', event);
    // Handle logo upload
  }

  resetSettings(): void {
    console.log('Resetting settings...');
    // Reset logic here
  }

}
