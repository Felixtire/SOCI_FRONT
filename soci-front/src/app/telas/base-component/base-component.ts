import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-base-component',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './base-component.html',
  styleUrl: './base-component.css',
})
export class BaseComponent {}
