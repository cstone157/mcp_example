import psycopg2

class PostgresDBFactory:
    def __init__(self, host, database, user, password):
        self.host = host
        self.database = database
        self.user = user
        self.password = password

    def create_connection(self):
        try:
            conn = psycopg2.connect(
                host=self.host,
                database=self.database,
                user=self.user,
                password=self.password
            )
            return conn
        except Exception as e:
            print(f"Error connecting to PostgreSQL: {e}")
            return None

    def close_connection(self, conn):
        if conn:
            conn.close()

    def check_connection(self):
        conn = self.create_connection()
        if conn:
            print("Connection to PostgreSQL successful!")
            self.close_connection(conn)
        else:
            print("Failed to connect to PostgreSQL.")
    
    def setup_database(self):
        conn = self.create_connection()
        if conn:
            try:
                cursor = conn.cursor()
                # Example: Create a table for storing chat requests
                cursor.execute("""
                    CREATE TABLE IF NOT EXISTS chat_request (
                        id SERIAL PRIMARY KEY,
                        initial_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        chat_message TEXT NOT NULL
                    );
                """)
                conn.commit()
                print("Database setup completed successfully!")
            except Exception as e:
                print(f"Error setting up database: {e}")
            finally:
                self.close_connection(conn)
    
    def insert_chat_request(self, chat_message):
        conn = self.create_connection()
        if conn:
            try:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO chat_request (chat_message) VALUES (%s);
                """, (chat_message,))
                conn.commit()
                print("Chat request inserted successfully!")
            except Exception as e:
                print(f"Error inserting chat request: {e}")
            finally:
                self.close_connection(conn)