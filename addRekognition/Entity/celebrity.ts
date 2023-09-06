import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DetectedCelebrity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    confidence: number;
}