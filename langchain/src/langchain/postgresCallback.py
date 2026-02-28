from langchain.postgres import PostgresFactory
from langchain.callbacks.stdout import StdOutCallbackHandler

class PostgresCallbackHandler(StdOutCallbackHandler):
    def __init__(self, postgres_factory: PostgresFactory):
        """
        Initialize callback handler.
        """
        super().__init__()
        self.postgres_factory = postgres_factory
        self.postgres_factory.setup_database()

    def on_chain_start(self, serialized: dict[str, any], inputs: dict[str, any], **kwargs: any) -> None:
        """
        Run on chain start.
        """
        super().on_chain_start(serialized, inputs, **kwargs)
        self.postgres_factory.insert_chat_request(str(inputs))