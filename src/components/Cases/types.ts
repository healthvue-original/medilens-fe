export type Case = {
  id?: number;
  name: string;
  description: string;
  referred_by: number;
  patient_id: number;
  created_at?: string;
};

/*
type Case struct {
	ID          uint // Standard field for the primary key
	Name        string
	Description string
	ReferredBy  int  `json:"referred_by"`
	User        User `gorm:"foreignKey:ReferredBy"`
	PatientId   int  `json:"patient_id"`
	Patient     User `gorm:"foreignKey:PatientId"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

*/
