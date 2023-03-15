import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Establishment} from "../../../shared/models/establishment.model";
import {FormControl} from "@angular/forms";
import {debounceTime, map, Subject, switchMap, takeUntil} from "rxjs";
import {EstablishmentService} from "../../../shared/services/establishment.service";
import {fuseAnimations} from "../../../../@fuse/animations";
import {MatDialog} from "@angular/material/dialog";
import {EstablishmentFormComponent} from "./establishment-form/establishment-form.component";

@Component({
    selector: 'establishments',
    templateUrl: './establishments.component.html',
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
export class EstablishmentsComponent implements OnInit, OnDestroy {

    establishments: Establishment[];
    isLoading: boolean = false;
    establishmentCount: number = 0;
    establishmentColumns: string[] = ['image', 'name', 'description', 'active', 'details'];
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
                protected _establishmentService: EstablishmentService) {
    }

    ngOnInit() {
        this._establishmentService.establishments$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {
                // Update the establishments
                this.establishments = response['data'].items;
                // Update the counts
                this.establishmentCount = response['data'].items.length;
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
                    return this._establishmentService.getEstablishments(0, 10, query);
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
        this._establishmentService.getEstablishments(event?.pageIndex, event?.pageSize).subscribe((value) => {
            this.establishments = value['data'].items;
            this.establishmentCount = value['data'].items.length;
            this.totalElements = value['data'].totalElements;
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Open establishment dialog
     */
    openAddEstablishmentDialog(): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(EstablishmentFormComponent, {
            data: {
                action: 'new'
            }
        });

        dialogRef.afterClosed()
            .subscribe((establishment: Establishment) => {
                if (establishment) {
                    this.getAll();
                    console.log('Establishment dialog was closed!');
                }

            });
    }

    /**
     * Open establishment dialog
     */
    openEditEstablishmentDialog(establishment: Establishment): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(EstablishmentFormComponent, {
            data: {
                action: 'edit',
                establishment: establishment
            }
        });

        dialogRef.afterClosed()
            .subscribe((establishment: Establishment) => {
                if (establishment) {
                    this.getAll();
                }
            });
    }

}
