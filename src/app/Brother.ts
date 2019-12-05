import {RelatedBrother} from './RelatedBrother';
import {MajorMinor} from './MajorMinor';
import {HeldPosition} from './HeldPosition';
import {Extracurricular} from './Extracurricular';
import {Question} from './Question';

export class Brother {
    public id: number;
    public firstName: string;
    public lastName: string;
    public zetaNumber?: number;
    public dateJoined?: Date;
    public initiated?: boolean;
    public dateInitiated?: Date;
    public expectedGraduation?: Date;
    public chapterDesignation: string;
    public bigBrother?: RelatedBrother;
    public majors: MajorMinor[];
    public minors: MajorMinor[];
    public positions: HeldPosition[];
    public extracurriculars: Extracurricular[];
    public littleBrothers: RelatedBrother[];
    public questions: Question[];
    public visible: boolean;
}
