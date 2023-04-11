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
import {CandidacyService} from "../../../shared/services/candidacy.service";
import {SelectionModel} from "@angular/cdk/collections";
import {ActivatedRoute, Router} from "@angular/router";
import {ResultService} from "../../../shared/services/result.service";
import {ToastrService} from "ngx-toastr";
import {Competition} from "../../../shared/models/competition.model";
import {CompetitionService} from "../../../shared/services/competition.service";
import {ResultSaveEntity} from "../../../shared/wrapper/result.save.entity";
import {AcceptedCandidacyFormComponent} from "./accepted-candidacy-form/accepted-candidacy-form.component";

@Component({
    selector: 'accepted-candidacies',
    templateUrl: './accepted-candidacies.component.html',
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
export class AcceptedCandidaciesComponent implements OnInit, OnDestroy {

    candidacies: Candidacy[];
    isLoading: boolean = false;
    candidacyCount: number = 0;
    candidacyColumns: string[] = ['checkbox', 'firstName', 'lastName', 'email', 'phone'];
    searchInputControl: FormControl = new FormControl();
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    totalElements: number;
    page = 0;
    size = 10;
    competitionUid: string;
    competition: Competition;
    resultSaveEntity = new ResultSaveEntity();
    selection = new SelectionModel<Candidacy>(true, []);

    /**
     * Constructor
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _matDialog: MatDialog,
                private route: ActivatedRoute,
                private _toast: ToastrService,
                private router: Router,
                protected _candidacyService: CandidacyService,
                protected _competitionService: CompetitionService,
                private _resultService: ResultService) {
        this.competitionUid = this.route.snapshot.params['competitionUid'];
        if (this.competitionUid) {
            this.getCompetition(this.competitionUid);
        }
    }

    ngOnInit() {
        this._candidacyService.acceptedCandidacies$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {
                // Update the establishments
                this.candidacies = response['data'].items;
                // Update the counts
                this.candidacyCount = response['data'].items.length;
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
                    return this._candidacyService.getAcceptedCandidacies(this.competitionUid, 0, 10, query);
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

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.candidacies.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.candidacies.forEach(row => this.selection.select(row));
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

    getCompetition(competitionUid: string) {
        this._competitionService.findOne(competitionUid).subscribe(value => {
            if (value.ok) {
                this.competition = value.data;
            }
        })
    }

    getAllByPage(event?) {
        this._candidacyService.getAcceptedCandidacies(this.competitionUid, event?.pageIndex, event?.pageSize).subscribe((value) => {
            this.candidacies = value['data'].items;
            this.candidacyCount = value['data'].items.length;
            this.totalElements = value['data'].totalElements;
            this._changeDetectorRef.markForCheck();
        });
    }


    submit() {
        this.resultSaveEntity.competitionUid = this.competitionUid;
        this.resultSaveEntity.competitionTitle = this.competition.title;
        this.resultSaveEntity.establishmentTitle = this.competition.establishment.name;
        this.resultSaveEntity.establishmentUid = this.competition.establishment.uid;
        this.resultSaveEntity.candidacies = this.selection.selected;

        // Open the dialog
        const dialogRef = this._matDialog.open(AcceptedCandidacyFormComponent, {
            data: {
                resultSaveEntity: this.resultSaveEntity
            }
        });

        dialogRef.afterClosed()
            .subscribe(value => {
                if (value) {
                    this.getAllByPage();
                }
            });
    }

}
