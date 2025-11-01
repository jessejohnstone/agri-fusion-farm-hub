export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      equipment_blockchain: {
        Row: {
          block_hash: string
          created_at: string
          equipment_id: string
          event_data: Json
          event_type: string
          id: string
          previous_hash: string | null
          timestamp: string
          user_id: string
        }
        Insert: {
          block_hash: string
          created_at?: string
          equipment_id: string
          event_data: Json
          event_type: string
          id?: string
          previous_hash?: string | null
          timestamp?: string
          user_id: string
        }
        Update: {
          block_hash?: string
          created_at?: string
          equipment_id?: string
          event_data?: Json
          event_type?: string
          id?: string
          previous_hash?: string | null
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_blockchain_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "farm_equipment_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      farm_equipment_uploads: {
        Row: {
          contact_phone: string | null
          county: string
          created_at: string
          description: string | null
          equipment_name: string
          equipment_type: string
          id: string
          image_url: string
          price: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          contact_phone?: string | null
          county: string
          created_at?: string
          description?: string | null
          equipment_name: string
          equipment_type: string
          id?: string
          image_url: string
          price?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          contact_phone?: string | null
          county?: string
          created_at?: string
          description?: string | null
          equipment_name?: string
          equipment_type?: string
          id?: string
          image_url?: string
          price?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      machinery_hire: {
        Row: {
          available: boolean
          contact_phone: string | null
          county: string
          created_at: string
          daily_rate: number | null
          description: string | null
          hourly_rate: number
          id: string
          image_url: string | null
          location: string
          machinery_name: string
          machinery_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          available?: boolean
          contact_phone?: string | null
          county: string
          created_at?: string
          daily_rate?: number | null
          description?: string | null
          hourly_rate: number
          id?: string
          image_url?: string | null
          location: string
          machinery_name: string
          machinery_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          available?: boolean
          contact_phone?: string | null
          county?: string
          created_at?: string
          daily_rate?: number | null
          description?: string | null
          hourly_rate?: number
          id?: string
          image_url?: string | null
          location?: string
          machinery_name?: string
          machinery_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          farm_type: string | null
          full_name: string | null
          id: string
          location: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          farm_type?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          farm_type?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      supply_chain_records: {
        Row: {
          batch_id: string
          chain_hash: string
          county: string
          created_at: string
          id: string
          location: string
          metadata: Json | null
          previous_hash: string | null
          product_name: string
          product_type: string
          stage: string
          timestamp: string
          user_id: string
        }
        Insert: {
          batch_id: string
          chain_hash: string
          county: string
          created_at?: string
          id?: string
          location: string
          metadata?: Json | null
          previous_hash?: string | null
          product_name: string
          product_type: string
          stage: string
          timestamp?: string
          user_id: string
        }
        Update: {
          batch_id?: string
          chain_hash?: string
          county?: string
          created_at?: string
          id?: string
          location?: string
          metadata?: Json | null
          previous_hash?: string | null
          product_name?: string
          product_type?: string
          stage?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      token_transactions: {
        Row: {
          amount: number
          created_at: string
          id: string
          metadata: Json | null
          reason: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          metadata?: Json | null
          reason: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          metadata?: Json | null
          reason?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_tokens: {
        Row: {
          balance: number
          created_at: string
          id: string
          total_earned: number
          total_spent: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          total_earned?: number
          total_spent?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          total_earned?: number
          total_spent?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vet_services: {
        Row: {
          available: boolean | null
          county: string
          created_at: string
          email: string | null
          id: string
          location: string
          name: string
          phone: string
          rating: number | null
          specialty: string
          years_experience: number | null
        }
        Insert: {
          available?: boolean | null
          county: string
          created_at?: string
          email?: string | null
          id?: string
          location: string
          name: string
          phone: string
          rating?: number | null
          specialty: string
          years_experience?: number | null
        }
        Update: {
          available?: boolean | null
          county?: string
          created_at?: string
          email?: string | null
          id?: string
          location?: string
          name?: string
          phone?: string
          rating?: number | null
          specialty?: string
          years_experience?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      award_tokens: {
        Args: {
          p_amount: number
          p_metadata?: Json
          p_reason: string
          p_user_id: string
        }
        Returns: undefined
      }
      generate_block_hash: {
        Args: {
          p_equipment_id: string
          p_event_data: Json
          p_event_type: string
          p_previous_hash: string
          p_timestamp: string
        }
        Returns: string
      }
      generate_chain_hash: {
        Args: {
          p_batch_id: string
          p_metadata: Json
          p_previous_hash: string
          p_stage: string
          p_timestamp: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
