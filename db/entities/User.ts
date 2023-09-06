import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    fullName: string;

    @Column({ nullable: false })
    email: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    @Column({ nullable: false })
    password: string;

    @Column({
        type: 'enum',
        enum: ['user', 'admin'],
        default: 'user',
    })
    role: 'user' | 'admin';

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP()',
    })
    createdAt: Date;

    @Column({ nullable: true, type: 'varchar', length: 255 }) // Use VARCHAR column type
    imageS3Link: string | null;
}
