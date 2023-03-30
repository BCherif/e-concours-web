import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, map, Subject, switchMap, takeUntil} from "rxjs";
import {fuseAnimations} from "../../../../@fuse/animations";
import {MatDialog} from "@angular/material/dialog";
import {Candidacy} from "../../../shared/models/candidacy.model";
import {STATE_CANDIDACY} from "../../../shared/enums/enumeration";
import {CandidacyService} from "../../../shared/services/candidacy.service";
import {CandidateVerificationComponent} from "./candidate-verification/candidate-verification.component";

@Component({
    selector: 'candidacies',
    templateUrl: './candidacies.component.html',
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class CandidaciesComponent implements OnInit, OnDestroy {

    candidacies: Candidacy[];
    isLoading: boolean = false;
    candidaciesCount: number = 0;
    candidaciesColumns: string[] = ['candidate', 'competition', 'state', 'active', 'details'];
    searchInputControl: FormControl = new FormControl();
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    totalElements: number;
    page = 0;
    size = 10;

    statecandidacy = STATE_CANDIDACY;

    /**
     * Constructor
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _matDialog: MatDialog,
                protected _candidacyService: CandidacyService) {
    }

    ngOnInit() {
        this._candidacyService.candidacies$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {
                // Update the establishments
                this.candidacies = response['data'].items;
                // Update the counts
                this.candidaciesCount = response['data'].items.length;
                this.totalElements = response['data'].totalElements;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.isLoading = true;
                    return this._candidacyService.getCandidacies(0, 10, query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.uid || index;
    }

    getAll(event?) {
        this._candidacyService.getCandidacies(event?.pageIndex, event?.pageSize).subscribe((value) => {
            this.candidacies = value['data'].items;
            this.candidaciesCount = value['data'].items.length;
            this.totalElements = value['data'].totalElements;
            this._changeDetectorRef.markForCheck();
        });
    }

    checkCandidate(candidacy: Candidacy): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(CandidateVerificationComponent, {
            data: {
                candidacy: candidacy
            }
        });

        dialogRef.afterClosed()
            .subscribe(value => {
                if (value) {
                    this.getAll();
                }
            });
    }


}
