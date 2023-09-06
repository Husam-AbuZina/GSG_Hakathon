import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExtractedText {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;
}