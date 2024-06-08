type CreatedUpdatedAt = {
  created_at: string;
  updated_at: string;
};
export type UserModel = {
  id: number;
  name: string;
} & CreatedUpdatedAt;

export type PatientModel = {
  id: number;
  name: string;
  email: string;
  age: number;
  sex: string;
  phone: number;
  created_by: number;
} & CreatedUpdatedAt;

export type HospitalModel = {
  id: number;
  name: string;
} & CreatedUpdatedAt;

export type CaseModel = {
  id: number;
  name: string;
  description: string;
  created_by: number;
  patient_id: number;
  hospital_id?: number;
  status: string;
} & CreatedUpdatedAt;

export type SpecimenModel = {
  id: number;
  name: string;
  file_path: string;
} & CreatedUpdatedAt;

export type GroupModel = {
  id: number;
  name: string;
} & CreatedUpdatedAt;

export type ScannerSlot = {
  id: number;
  order: number;
  status: "available" | "busy";
};

export type ScannerModel = {
  id: number;
  name: string;
  group_id: number;
  slots: ScannerSlot[];
} & CreatedUpdatedAt;

export type ScanJobModel = {
  id: number;
  scanner_id: number;
  case_id: number;
  status: string;
  slot_id: number;
} & CreatedUpdatedAt;

/*
    type User struct {
        ID        uint      // Standard field for the primary key
        Name      string    // A regular string field
        Email     string    // A pointer to a string, allowing for null values
        CreatedAt time.Time // Automatically managed by GORM for creation time
        UpdatedAt time.Time // Automatically managed by GORM for update time
    }

    type Patient struct {
        ID        uint
        Name      string
        Email     string
        Age       int
        Sex       string
        Phone     int
        CreatedBy int  `json:"created_by"`
        User      User `gorm:"foreignKey:CreatedBy"`
        CreatedAt time.Time
        UpdatedAt time.Time
    }

    type Case struct {
        ID          uint // Standard field for the primary key
        Name        string
        Description string
        CreatedBy   int      `json:"created_by"`
        User        User     `gorm:"foreignKey:CreatedBy"`
        PatientId   int      `json:"patient_id"`
        Patient     Patient  `gorm:"foreignKey:PatientId"`
        HospitalId  int      `json:"hospital_id"`
        Hospital    Hospital `gorm:"foreignKey:HospitalId"`
        CreatedAt   time.Time
        UpdatedAt   time.Time
        Status      string `json:"status"`
        //todo:enum
    }

    type Specimen struct {
        ID        uint // Standard field for the primary key
        Name      string
        FilePath  string
        UserID    int
        User      User
        CreatedAt time.Time
        UpdatedAt time.Time
    }

    type Scanner struct {
        ID        uint // Standard field for the primary key
        Name      string
        GroupId   int   `json:"group_id"`
        Group     Group `gorm:"foreignKey:GroupId"`
        CreatedAt time.Time
        UpdatedAt time.Time
    }

    type Hospital struct {
        ID        uint
        Name      string
        CreatedAt time.Time
        UpdatedAt time.Time
    }

    type Group struct {
        ID        uint // Standard field for the primary key
        Name      string
        CreatedAt time.Time
        UpdatedAt time.Time
    }

    type ScanJob struct {
        ID        uint
        ScannerId int
        Scanner   Scanner `gorm:"foreignKey:ScannerId"`
        CaseId    int     `json:"case_id"`
        Case      Case    `gorm:"foreignKey:CaseId"`
        GroupId   int     `json:"group_id"`
        Group     Group   `gorm:"foreignKey:GroupId"`
        Status    string
        CreatedAt time.Time
        UpdatedAt time.Time
    }

*/
