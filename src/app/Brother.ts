import {RelatedBrother} from './RelatedBrother';
import {MajorMinor} from './MajorMinor';
import {Position} from './Position';
import {Extracurricular} from './Extracurricular';
import {Question} from './Question';

export class Brother {
    public id: number;
    public firstName: string;
    public lastName: string;
    public zetaNumber?: number;
    public dateJoined?: Date;
    public dateInitiated?: Date;
    public chapterDesignation: string;
    public expectedGraduation?: Date;
    public bigBrother: RelatedBrother;
    public majors: MajorMinor[];
    public minors: MajorMinor[];
    public positions: Position[];
    public extracurriculars: Extracurricular[];
    public littleBrothers: RelatedBrother[];
    public questions: Question[];
}
