import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../Services/authservice.service';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartType, ChartDataset,ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admincomponent',
  standalone: true, 
  imports: [CommonModule,NgChartsModule],
  templateUrl: './admincomponent.component.html',
  styleUrl: './admincomponent.component.css'
})
export class AdmincomponentComponent implements OnInit {
  bookings: any[] = [];
  customers: any[] = [];
  packages: any[] = [];
  reviews: any[] = [];
  users: any[] = [];
  totalUsers: number = 0;
  totalPackages: number = 0;
  totalAdmins: number = 0;
  totalCustomers: number = 0;
  totalTravelAgents: number = 0;
  visibleRows: number = 5;
 userRole: string | null = localStorage.getItem('userRole');
 
  

  public barChartOptions: ChartOptions = {
     responsive: true,
     plugins: {
     legend: {
     display: false,
     },
     tooltip: {
     enabled: true,
     },
     },
     scales: {
     x: {
     grid: {
     display: true,
     color: '#f0f0f0',
     },
     },
     y: {
     beginAtZero: true,
     grid: {
     color: '#e5e5e5',
     },
     },
     },
     elements: {
     bar: {
     borderRadius: {
     topLeft: 10,
     topRight: 10,
     bottomLeft: 0,
     bottomRight: 0,
     },
     borderSkipped: false,
     backgroundColor: (context) => {
     const chart = context.chart;
     const { ctx, chartArea } = chart;
     if (!chartArea) {
     return '#ff6384'; // Default color if chartArea is not available
     }
     const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
     gradient.addColorStop(0, '#ff6384');
     gradient.addColorStop(1, '#36a2eb');
     return gradient as CanvasGradient;
     },
     },
     },
    };
      
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [
    { data: [], label: 'Bookings' }
  ];
  doughnutChartLabels: string[] = ['Cancelled', 'Confirmed'];



public doughnutChartData: ChartData<'doughnut'> = {
   labels: this.doughnutChartLabels,
   datasets: [
   {
   data: [0, 0],
   backgroundColor: ['#ff6384', '#36a2eb'], //  vibrant colors
   hoverBackgroundColor: ['#ff7f91', '#5aa9f4'], // Slightly lighter colors on hover
   borderColor: ['#ffffff', '#ffffff'], // White borders for better contrast
   borderWidth: 2, // Thicker borders for a cleaner look
   },
   ],
  };
  
  
  doughnutChartType: ChartType = 'doughnut';
  constructor(private apiService: AuthserviceService,private router:Router) { }
 
  ngOnInit(): void {
    this.getBookings();
    this.getPackages();
    this.getTotalUsers();
    this.getUsersByRole();
  }
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  getTotalUsers(): void {
    this.apiService.getTotalUsers().subscribe(data => {
      this.users = data
      this.totalUsers = data.length;
    });
  }
 
  getUsersByRole(): void {
    this.apiService.getUsersByRole('Admin').subscribe(admins => {
    this.totalAdmins = admins.length;
    });
    this.apiService.getUsersByRole('Travel Agent').subscribe(data => { 
      this.totalTravelAgents = data.length;
    });
    this.apiService.getUsersByRole('Customer').subscribe(data => {
      this.customers = data;
      this.totalCustomers = data.length;
    });

  }
  

  getBookings(): void {
    this.apiService.getBookings().subscribe(data => {
      this.bookings = data; 
      // Generate Bar Chart
      this.generateMonthlyBookingsChart();
    const Cancelled = this.bookings.filter(b => b.status === 'Cancelled').length;
    const confirmed = this.bookings.filter(b => b.status === 'Confirmed').length;
 
    // Update doughnut chart data
    this.doughnutChartData = {
      ...this.doughnutChartData, // Spread existing properties
      datasets: [
        {
          ...this.doughnutChartData.datasets[0], // Spread existing dataset properties
          data: [Cancelled, confirmed] // Update data
        }
      ]
    };

    });
  }
 
 
 
  getPackages(): void {
    this.apiService.getPackages().subscribe(data => {
      this.packages = data;
      this.totalPackages = data.length;
    });
  }
 
  getReviews(): void {
    this.apiService.getReviews().subscribe(data => {
      this.reviews = data;
    });
  }
 
 
 
  generateMonthlyBookingsChart(): void {
    const monthlyCounts = Array(12).fill(0);
 
    this.bookings.forEach(booking => {
      const startDate = new Date(booking.startDate);
      const month = startDate.getMonth(); // 0 = January, 11 = December
      monthlyCounts[month]++;
    });
 
    this.barChartLabels = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.barChartData[0].data = monthlyCounts;
  }

  openAddAgentForm(): void {
    this.router.navigate(['/app-admin-register']); // Adjust the route as per your app's routing configuration
  }
  seeMore(): void {
    this.visibleRows += 5; // Increase the number of visible rows by 5
  }
  
gotoAssistance(): void {
  this.router.navigate(['/app-assistance']);
}
gotoPackages(): void {
  this.router.navigate(['/app-agent']);
}
goToUsers(): void {
  this.router.navigate(['/app-users']);
}

logout(): void {
  this.apiService.logout();
  this.router.navigate(['/']); // Redirect to the login page
}

goToBookings(): void {
  this.router.navigate(['/app-admin-bookings']);
}

}







