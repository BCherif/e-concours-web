import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class ImportFileService {

    constructor(@Inject(DOCUMENT) private document: Document) { }

    public getFile(accept: string): Promise<File> {
        return new Promise<File>((resolve, reject) => {
            const fileInput: HTMLInputElement = this.document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = accept;
            fileInput.addEventListener('error', event => {
                reject(event.error);
            });
            fileInput.addEventListener('change', event => {
                resolve(fileInput.files[0]);
            });
            fileInput.click();
        });
    }
    dataURLtoBlob(dataURL) {
        let binary = atob(dataURL.split(',')[1]);
        let array = [];
        for (var index = 0; index < binary.length; index++) {
            array.push(binary.charCodeAt(index));
        }
        return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
    }
}
