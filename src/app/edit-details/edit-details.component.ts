import { Component, OnInit } from "@angular/core";
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from "@angular/router";

import { Brother } from "../Brother";
import { MajorMinor } from '../MajorMinor';
import { Question } from '../Question';
import { BrotherService } from '../brother.service';
import { ConfigService } from '../config.service';
import { Position } from '../Position';
import { DataService } from '../data.service';
import { HeldPosition } from '../HeldPosition';
import { MinimalBrother } from '../MinimalBrother';

@Component({
    selector: 'edit-details',
    templateUrl: 'edit-details.template.html',
    styleUrls: [
        "edit-details.style.css"
    ]
})
export class EditDetailsComponent implements OnInit{
    private brother: Brother;
    private allBrothers: MinimalBrother[];
    private allMajors: MajorMinor[];
    private allMinors: MajorMinor[];
    private allQuestions: Question[];
    private allPositions: Position[];
    private picture: File;
    private pictureUrl: string;
    private isPictureDirty: boolean;

    constructor(private brotherService: BrotherService, private route: ActivatedRoute, private router: Router, private data: DataService, private config: ConfigService){
    }

    ngOnInit(): void{
        this.route.params
            .subscribe(p => {
                let id: number = +p['id'];
                this.brotherService.getBrother(id).then(response => {
                    this.brother = response;
                    this.brother.initiated = this.brother.dateInitiated != null;
                });
                this.pictureUrl = `${this.brotherService.getPictureBaseUrl()}/${id}`;
            });
        
        this.data.fetchMajors()
            .then(vals => this.allMajors = vals);

        this.data.fetchMinors()
            .then(vals => this.allMinors = vals);

        this.brotherService.GetMinimalBrothers()
            .then(vals => this.allBrothers = vals);

        this.data.getQuestions()
            .then(vals => this.allQuestions = vals);
            
        this.data.getPositions()
            .then(vals => this.allPositions = vals);
    }

    async saveChanges(): Promise<void>{
        await this.brotherService.saveBrother(this.brother);
        
        if(this.isPictureDirty){
            await this.brotherService.savePicture(this.brother.id, this.picture);
        }

        this.goBackToDetails();
    }

    goBackToDetails(): void{
        this.router.navigate(['/details', this.brother.id]);
    }
    
    getChapterDesignation(): string{
        return this.brother.chapterDesignation ? this.brother.chapterDesignation : "\u039A\u03A6";
    }

    toggleVisibility(): void{
        this.brother.visible = !this.brother.visible;
    }

    addMajor(): void{
        this.brother.majors.push(new MajorMinor());
    }

    deleteMajor(major: MajorMinor): void{
        let found: boolean = false;
        let majors: MajorMinor[] = Array();
        this.brother.majors.forEach((val: MajorMinor, index: number, array: MajorMinor[]) => {
            if(val.id != major.id || found){
                majors.push(val);
            }else{
                found = true;
            }
        });
        this.brother.majors = majors;
    }
    
    addMinor(): void{
        this.brother.minors.push(new MajorMinor());
    }

    deleteMinor(minor: MajorMinor): void{
        let found: boolean = false;
        let minors: MajorMinor[] = Array();
        this.brother.minors.forEach((val: MajorMinor, index: number, array: MajorMinor[]) => {
            if(val.id != minor.id || found){
                minors.push(val);
            }else{
                found = true;
            }
        });
        this.brother.minors = minors;
    }

    addQuestion(): void{
        this.brother.questions.push(new Question());
    }

    deleteQuestion(questionIndex: number): void{
        let found: boolean = false;
        let questions: Question[] = Array();
        this.brother.questions.forEach((val: Question, index: number, array: Question[]) =>{
            if(index !== questionIndex){
                questions.push(val);
            }
        });
        this.brother.questions = questions;
    }

    hasUnansweredQuestions(): boolean{
        return this.brother.questions.length != this.allQuestions.length;
    }

    addPosition(): void{
        this.brother.positions.push(new HeldPosition());
    }

    deletePosition(positionIndex: number): void{
        this.brother.positions.splice(positionIndex, 1);
    }

    makePictureDirty(){
        this.isPictureDirty = true;
    }

    removePicture(){
        this.pictureUrl = null;
        this.picture = null;
        this.makePictureDirty();
    }

    fileChanged(event: any){
        if(event.target.files.length == 0){
            return;
        }
        this.makePictureDirty();
        this.picture = event.target.files[0];
    }
}