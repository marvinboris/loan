export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      collection_records: {
        Row: {
          collector_id: number
          connection: Database["public"]["Enums"]["connection_status"]
          contact: string
          created_at: string
          id: number
          loan_id: number
          mark: string
          overdue_reason: string
          record_content: string
          record_time: string
          result: string
          target_contact: string
          updated_at: string
          willingness_to_pay: Database["public"]["Enums"]["willingness_to_pay"]
        }
        Insert: {
          collector_id: number
          connection: Database["public"]["Enums"]["connection_status"]
          contact: string
          created_at?: string
          id?: number
          loan_id: number
          mark: string
          overdue_reason: string
          record_content: string
          record_time: string
          result: string
          target_contact: string
          updated_at?: string
          willingness_to_pay: Database["public"]["Enums"]["willingness_to_pay"]
        }
        Update: {
          collector_id?: number
          connection?: Database["public"]["Enums"]["connection_status"]
          contact?: string
          created_at?: string
          id?: number
          loan_id?: number
          mark?: string
          overdue_reason?: string
          record_content?: string
          record_time?: string
          result?: string
          target_contact?: string
          updated_at?: string
          willingness_to_pay?: Database["public"]["Enums"]["willingness_to_pay"]
        }
        Relationships: [
          {
            foreignKeyName: "collection_records_collector_id_fkey"
            columns: ["collector_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_records_loan_id_fkey"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          account: string | null
          allocation_time: string | null
          app_name: string | null
          app_time: string | null
          created_at: string
          desc_follow_up: string | null
          district: string | null
          follow_up_person: string | null
          follow_up_results: string | null
          id: number
          latest_follow_up_time: string | null
          mobile: string
          name: string
          prev_repayment_time: string | null
          telemarketer_id: number | null
          type: Database["public"]["Enums"]["customer_type"]
          updated_at: string
          user_label: string | null
          verification_code: number | null
          verification_code_expires: string | null
          whether_apply: boolean
          whether_assigned: boolean
        }
        Insert: {
          account?: string | null
          allocation_time?: string | null
          app_name?: string | null
          app_time?: string | null
          created_at?: string
          desc_follow_up?: string | null
          district?: string | null
          follow_up_person?: string | null
          follow_up_results?: string | null
          id?: number
          latest_follow_up_time?: string | null
          mobile: string
          name: string
          prev_repayment_time?: string | null
          telemarketer_id?: number | null
          type: Database["public"]["Enums"]["customer_type"]
          updated_at?: string
          user_label?: string | null
          verification_code?: number | null
          verification_code_expires?: string | null
          whether_apply?: boolean
          whether_assigned?: boolean
        }
        Update: {
          account?: string | null
          allocation_time?: string | null
          app_name?: string | null
          app_time?: string | null
          created_at?: string
          desc_follow_up?: string | null
          district?: string | null
          follow_up_person?: string | null
          follow_up_results?: string | null
          id?: number
          latest_follow_up_time?: string | null
          mobile?: string
          name?: string
          prev_repayment_time?: string | null
          telemarketer_id?: number | null
          type?: Database["public"]["Enums"]["customer_type"]
          updated_at?: string
          user_label?: string | null
          verification_code?: number | null
          verification_code_expires?: string | null
          whether_apply?: boolean
          whether_assigned?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "customers_telemarketer_id_fkey"
            columns: ["telemarketer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc: {
        Row: {
          back_photo: string
          birthdate: string
          created_at: string
          customer_id: number
          emergency_number_1: string
          emergency_number_2: string | null
          first_name: string | null
          front_photo: string
          id: number
          last_name: string
          location: string
          selfie: string
          status: string
          updated_at: string
        }
        Insert: {
          back_photo: string
          birthdate: string
          created_at?: string
          customer_id: number
          emergency_number_1: string
          emergency_number_2?: string | null
          first_name?: string | null
          front_photo: string
          id?: number
          last_name: string
          location: string
          selfie: string
          status?: string
          updated_at?: string
        }
        Update: {
          back_photo?: string
          birthdate?: string
          created_at?: string
          customer_id?: number
          emergency_number_1?: string
          emergency_number_2?: string | null
          first_name?: string | null
          front_photo?: string
          id?: number
          last_name?: string
          location?: string
          selfie?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_customer"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      loans: {
        Row: {
          amount_repaid: number | null
          app_channel: string
          app_name: string
          app_status: string
          app_version: string
          collection_stage: string | null
          collector_id: number | null
          created_at: string
          customer_id: number
          days_overdue: number | null
          due_date: string
          id: number
          loan_amount: number
          loan_number: string
          loan_order_number: string
          loan_status: string
          loan_tenure: number
          loan_type: string
          product_name: string
          repeated_borrowing: boolean
          tag: string | null
          total_repayment: number | null
          updated_at: string
        }
        Insert: {
          amount_repaid?: number | null
          app_channel: string
          app_name: string
          app_status: string
          app_version: string
          collection_stage?: string | null
          collector_id?: number | null
          created_at?: string
          customer_id: number
          days_overdue?: number | null
          due_date: string
          id?: number
          loan_amount: number
          loan_number: string
          loan_order_number: string
          loan_status: string
          loan_tenure: number
          loan_type: string
          product_name: string
          repeated_borrowing?: boolean
          tag?: string | null
          total_repayment?: number | null
          updated_at?: string
        }
        Update: {
          amount_repaid?: number | null
          app_channel?: string
          app_name?: string
          app_status?: string
          app_version?: string
          collection_stage?: string | null
          collector_id?: number | null
          created_at?: string
          customer_id?: number
          days_overdue?: number | null
          due_date?: string
          id?: number
          loan_amount?: number
          loan_number?: string
          loan_order_number?: string
          loan_status?: string
          loan_tenure?: number
          loan_type?: string
          product_name?: string
          repeated_borrowing?: boolean
          tag?: string | null
          total_repayment?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loans_collector_id_fkey"
            columns: ["collector_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loans_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      performances: {
        Row: {
          app_rate: number
          bonus: number
          case_coverage: number | null
          created_at: string
          date: string
          date_range: string | null
          days_of_employment: number | null
          first_call_time: string | null
          group_name: string
          handle_num: number
          id: number
          latest_call_time: string | null
          new_assigned_num: number
          num_of_approved_apps: number
          num_of_apps: number
          num_of_calls: number | null
          num_of_connections: number | null
          num_of_sms: number | null
          phone_connection_rate: number | null
          ranking: number | null
          status: string
          target_num: number
          target_repay_rate: number
          total_assigned_qty: number
          total_call_duration: number | null
          type: Database["public"]["Enums"]["performance_type"]
          updated_at: string
          user_id: number | null
        }
        Insert: {
          app_rate: number
          bonus: number
          case_coverage?: number | null
          created_at?: string
          date: string
          date_range?: string | null
          days_of_employment?: number | null
          first_call_time?: string | null
          group_name: string
          handle_num: number
          id?: number
          latest_call_time?: string | null
          new_assigned_num: number
          num_of_approved_apps: number
          num_of_apps: number
          num_of_calls?: number | null
          num_of_connections?: number | null
          num_of_sms?: number | null
          phone_connection_rate?: number | null
          ranking?: number | null
          status: string
          target_num: number
          target_repay_rate: number
          total_assigned_qty: number
          total_call_duration?: number | null
          type: Database["public"]["Enums"]["performance_type"]
          updated_at?: string
          user_id?: number | null
        }
        Update: {
          app_rate?: number
          bonus?: number
          case_coverage?: number | null
          created_at?: string
          date?: string
          date_range?: string | null
          days_of_employment?: number | null
          first_call_time?: string | null
          group_name?: string
          handle_num?: number
          id?: number
          latest_call_time?: string | null
          new_assigned_num?: number
          num_of_approved_apps?: number
          num_of_apps?: number
          num_of_calls?: number | null
          num_of_connections?: number | null
          num_of_sms?: number | null
          phone_connection_rate?: number | null
          ranking?: number | null
          status?: string
          target_num?: number
          target_repay_rate?: number
          total_assigned_qty?: number
          total_call_duration?: number | null
          type?: Database["public"]["Enums"]["performance_type"]
          updated_at?: string
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "performances_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      repayments: {
        Row: {
          collector_id: number | null
          created_at: string
          creation_time: string
          desc_follow_up: string | null
          follow_up_results: string | null
          id: number
          latest_follow_up_time: string | null
          loan_id: number
          payback_time: string | null
          payment_channel: string | null
          payment_company_serial_number: string | null
          real_amount: number | null
          repayment_amount: number
          repayment_code_va_link: string | null
          repayment_number: string
          trading_status: Database["public"]["Enums"]["trading_status"]
          updated_at: string
          whether_assigned: boolean
        }
        Insert: {
          collector_id?: number | null
          created_at?: string
          creation_time: string
          desc_follow_up?: string | null
          follow_up_results?: string | null
          id?: number
          latest_follow_up_time?: string | null
          loan_id: number
          payback_time?: string | null
          payment_channel?: string | null
          payment_company_serial_number?: string | null
          real_amount?: number | null
          repayment_amount: number
          repayment_code_va_link?: string | null
          repayment_number: string
          trading_status: Database["public"]["Enums"]["trading_status"]
          updated_at?: string
          whether_assigned?: boolean
        }
        Update: {
          collector_id?: number | null
          created_at?: string
          creation_time?: string
          desc_follow_up?: string | null
          follow_up_results?: string | null
          id?: number
          latest_follow_up_time?: string | null
          loan_id?: number
          payback_time?: string | null
          payment_channel?: string | null
          payment_company_serial_number?: string | null
          real_amount?: number | null
          repayment_amount?: number
          repayment_code_va_link?: string | null
          repayment_number?: string
          trading_status?: Database["public"]["Enums"]["trading_status"]
          updated_at?: string
          whether_assigned?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "repayments_collector_id_fkey"
            columns: ["collector_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repayments_loan_id_fkey"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          collection_distribution_rules: string | null
          created_at: string
          email: string
          entry_date: string | null
          group: string | null
          id: number
          last_login_ip: string | null
          name: string
          password: string
          reset_password_expires: string | null
          reset_password_token: string | null
          role: Database["public"]["Enums"]["user_role"]
          rules_approving_distribution: string | null
          staff_level: string | null
          status: Database["public"]["Enums"]["user_status"]
          updated_at: string
          voice_collection: boolean
          weights: number | null
          work_number: string
        }
        Insert: {
          collection_distribution_rules?: string | null
          created_at?: string
          email: string
          entry_date?: string | null
          group?: string | null
          id?: number
          last_login_ip?: string | null
          name: string
          password: string
          reset_password_expires?: string | null
          reset_password_token?: string | null
          role: Database["public"]["Enums"]["user_role"]
          rules_approving_distribution?: string | null
          staff_level?: string | null
          status?: Database["public"]["Enums"]["user_status"]
          updated_at?: string
          voice_collection?: boolean
          weights?: number | null
          work_number: string
        }
        Update: {
          collection_distribution_rules?: string | null
          created_at?: string
          email?: string
          entry_date?: string | null
          group?: string | null
          id?: number
          last_login_ip?: string | null
          name?: string
          password?: string
          reset_password_expires?: string | null
          reset_password_token?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          rules_approving_distribution?: string | null
          staff_level?: string | null
          status?: Database["public"]["Enums"]["user_status"]
          updated_at?: string
          voice_collection?: boolean
          weights?: number | null
          work_number?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      connection_status: "connected" | "no_answer" | "wrong_number"
      customer_type: "new" | "old" | "registered"
      performance_type:
        | "telemarketer_daily"
        | "telemarketer_monthly"
        | "team_daily"
        | "team_monthly"
        | "collector_daily"
        | "collector_monthly"
      trading_status: "pending" | "success" | "failed"
      user_role: "admin" | "telemarketer" | "collector"
      user_status: "active" | "inactive"
      willingness_to_pay: "high" | "medium" | "low" | "refusal"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      connection_status: ["connected", "no_answer", "wrong_number"],
      customer_type: ["new", "old", "registered"],
      performance_type: [
        "telemarketer_daily",
        "telemarketer_monthly",
        "team_daily",
        "team_monthly",
        "collector_daily",
        "collector_monthly",
      ],
      trading_status: ["pending", "success", "failed"],
      user_role: ["admin", "telemarketer", "collector"],
      user_status: ["active", "inactive"],
      willingness_to_pay: ["high", "medium", "low", "refusal"],
    },
  },
} as const
