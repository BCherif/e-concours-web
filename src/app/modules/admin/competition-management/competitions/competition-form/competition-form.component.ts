import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {Competition} from "../../../../../shared/models/competition.model";
import {CompetitionService} from "../../../../../shared/services/competition.service";
import {IResponse} from "../../../../../shared/http/response";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Folder} from "../../../../../shared/models/folder.model";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {EstablishmentService} from "../../../../../shared/services/establishment.service";
import {Establishment} from "../../../../../shared/models/establishment.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'competition-form',
    templateUrl: './competition-form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CompetitionFormComponent implements OnInit {
    horizontalStepperForm: UntypedFormGroup;

    competition: Competition;
    establishment: Establishment;
    establishments: Establishment[];

    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    folders: Folder[] = [];

    action: string;

    imageFile: any;

    file: FormData = new FormData();

    /**
     * Constructor
     */
    constructor(private _formBuilder: UntypedFormBuilder,
                private _competitionService: CompetitionService,
                private _toast: ToastrService,
                public matDialogRef: MatDialogRef<CompetitionFormComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private _establishmentService: EstablishmentService
    ) {
        this.action = _data.action;
        if (this.action === 'edit') {
            this.competition = _data.competition;
        } else {
            this.competition = new Competition();
            this.createForm();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.findAllEstablishment();
        /*   const competitionId: string | null = this.route.snapshot.paramMap.get('id');
           if (competitionId === 'new') {
               this.action = 'new';
               this.createForm();
           } else {
               this.findById(competitionId);
           }*/
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our folder
        if (value) {
            this.folders.push({title: value});
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    remove(folder: Folder): void {
        const index = this.folders.indexOf(folder);

        if (index >= 0) {
            this.folders.splice(index, 1);
        }
    }

    edit(folder: Folder, event: MatChipEditedEvent) {
        const value = event.value.trim();
        // Remove folder if it no longer has a name
        if (!value) {
            this.remove(folder);
            return;
        }
        // Edit existing folder
        const index = this.folders.indexOf(folder);
        if (index >= 0) {
            this.folders[index].title = value;
        }
    }


    createForm() {
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                uid: [''],
                title: ['', Validators.required],
                establishment: ['', Validators.required],
                deadline: ['', Validators.required],
                competitionDate: ['', Validators.required],
                quotation: ['', Validators.required]
            }),
            step2: this._formBuilder.group({
                folders: ['', Validators.required]
            })
        });
    }

    findById(competitionId: string) {
        this._competitionService.findOne(competitionId).subscribe((response: IResponse) => {
            if (response.ok) {
                this.competition = response.data;
            }
        })
    }

    findAllEstablishment() {
        this._establishmentService.findAll().subscribe((establishments: Establishment[]) => {
            this.establishments = establishments;
        })
    }

    findEstablishmentById(uid: string) {
        this._establishmentService.findOne(uid).subscribe((response: IResponse) => {
            if (response.ok) {
                this.establishment = response.data;
            }
        })
    }

    loadFiles(event) {
        this.imageFile = event.target.files[0];
    }

    /**
     * close
     */
    close(): void {// Close the dialog
        this.matDialogRef.close();
    }

    onChangeEstablisment(uid: string) {
        this.findEstablishmentById(uid);
    }

    send() {
        this.competition = this.horizontalStepperForm.get('step1').value;
        this.competition.establishment = this.establishment;
        this.competition.folders = this.folders;
        if (this.action === 'new') {
            this.file.append('competition', JSON.stringify(this.competition));
            this.file.append('imageUrl', this.imageFile);
            this._competitionService.create(this.file).subscribe((response: IResponse) => {
                if (response.ok) {
                    this.matDialogRef.close(response.data);
                    this._toast.success(response.message);
                } else {
                    this._toast.error(response.message);
                }
            })
        }
    }
}
