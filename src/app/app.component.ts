import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'How It Works', url: '/how-it-works', icon: 'help-circle-outline' },
    { title: 'Why Visity', url: '/why-visity', icon: 'mail' },
    { title: 'Pricing', url: '/pricing', icon: 'mail' },
    // { title: 'FAQ', url: '/faq', icon: 'mail' },
    // { title: 'Sign Up', url: '/sign-up', icon: 'mail' },
    { title: 'Contact Us', url: '/contact-us', icon: 'mail' },
    // { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    // { title: 'RSVP', url: '/rsvp', icon: 'mail' },
    // { title: 'QR Code', url: '/qrcode', icon: 'mail' },
    // { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
