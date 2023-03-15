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
import {CompetitionService} from "../../../../shared/services/competition.service";
import {IResponse} from "../../../../shared/http/response";
import {Competition} from "../../../../shared/models/competition.model";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {MatDialog} from "@angular/material/dialog";
import {CompetitionFormComponent} from "./competition-form/competition-form.component";

@Component({
    selector: 'competitions',
    templateUrl: './competitions.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class CompetitionsComponent implements OnInit, OnDestroy {

    competitions: Competition[];
    isLoading: boolean = false;
    competitionsCount: number = 0;
    competitionsColumns: string[] = ['image', 'title', 'deadline', 'competitionDate', 'quotation', 'active', 'details'];
    searchInputControl: FormControl = new FormControl();
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    totalElements: number;
    page = 0;
    size = 10;

    /**
     * Constructor
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _matDialog: MatDialog,
                private _competitionService: CompetitionService) {
    }

    ngOnInit() {
        this._competitionService.competitions$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: IResponse) => {
                // Update the competitions
                this.competitions = response['data'].items;
                // Update the counts
                this.competitionsCount = response['data'].items.length;
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
                    return this._competitionService.getCompetitions(0, 10, query);
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

    getCompetitionsByPage(event?) {
        this._competitionService.getCompetitions(event?.pageIndex, event?.pageSize).subscribe((value) => {
            this.competitions = value['data'].items;
            this.competitionsCount = value['data'].items.length;
            this.totalElements = value['data'].totalElements;
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Open competition dialog
     */
    openAddCompetitionDialog(): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(CompetitionFormComponent, {
            data: {
                action: 'new'
            }
        });

        dialogRef.afterClosed()
            .subscribe((competition: Competition) => {
                if (competition) {
                    this.getCompetitionsByPage();
                }
            });
    }


}
