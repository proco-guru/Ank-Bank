import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import {
  BeneficiaryModel,
  BeneficiaryService,
} from '../../../services/beneficiaryService/beneficiary-service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-beneficiary-search',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './beneficiary-search.html',
  styleUrl: './beneficiary-search.css',
})
export class BeneficiarySearch implements OnInit, OnDestroy {
  private beneService = inject(BeneficiaryService);
  isSearching: boolean = false;
  beneListDetails: BeneficiaryModel[] = [];
  // beneListWithSignal!: Signal<BeneficiaryModel[]>;

  private destroy$ = new Subject<void>(); // Cleanly caps subscriptions to prevent memory leaks

  beneListWithSignal = toSignal(this.beneService.getBeneficiaries(), {
    initialValue: [] as BeneficiaryModel[],
  });
  beneSearch = new FormControl('', [Validators.required, Validators.minLength(3)]);

  ngOnInit(): void {
    //setting entire default table
    // this.beneService
    //   .getBeneficiaries()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (beneData) => {
    //       this.beneListDetails = beneData;
    //       console.log('Default beneficiaries loaded:', this.beneListDetails);
    //     },
    //     error: (err) => console.error('Failed to load defaults:', err),
    //   });

    this.beneSearch.valueChanges
      .pipe(
        // 1. Turn on loader IMMEDIATELY as the user starts typing
        tap(() => {
          this.isSearching = true;
        }),

        // 2. Wait for the user to stop typing for 300ms
        debounceTime(200),

        // 3. Only trigger if the search text actually changed from the last typed word
        distinctUntilChanged(),

        // 4. Cancel old pending requests and switch to the new HTTP fetch call safely
        switchMap((term: string | null) => {
          const cleanTerm = term ?? ''; // Safely handle null/empty inputs
          return this.beneService.getBeneficiarieSearch(cleanTerm);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (beneData) => {
          this.beneListDetails = beneData;
          this.isSearching = false;
          console.log('Search Results Captured Successfully:', beneData);
        },
        error: (err) => {
          console.error('API Stream Processing Error:', err);
          this.isSearching = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
