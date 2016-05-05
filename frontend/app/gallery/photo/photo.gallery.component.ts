///<reference path="../../../browser.d.ts"/>

import {Component, Input, ElementRef, ViewChild} from '@angular/core';
import {Photo} from "../../../../common/entities/Photo";
import {Directory} from "../../../../common/entities/Directory"; 
import {IRenderable, Dimension} from "../../model/IRenderable"; 

@Component({
    selector: 'gallery-photo',
    templateUrl: 'app/gallery/photo/photo.gallery.component.html',
    styleUrls: ['app/gallery/photo/photo.gallery.component.css'],
})
export class GalleryPhotoComponent implements IRenderable{
    @Input() photo: Photo;
    @Input() directory: Directory;
    @ViewChild("image") imageRef:ElementRef;
    
    constructor() {
    }

    getPhotoPath(){
        return Photo.getThumbnailPath(this.directory,this.photo);
    }

 
    public getDimension():Dimension{ 
        return new Dimension(this.imageRef.nativeElement.offsetTop,
                           this.imageRef.nativeElement.offsetLeft,
                           this.imageRef.nativeElement.width,
                           this.imageRef.nativeElement.height);
    }
    
}
