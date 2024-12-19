export interface IReplyFormat {
  security_risks: "high" | "mid" | "low" | "none";
  source_code_quality: "high" | "mid" | "low";
  unnecessary_code_exists: boolean;
  comment: string;
}
