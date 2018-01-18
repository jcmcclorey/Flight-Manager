bulk insert dbo.Airports
from 'C:\Users\Joe\Documents\airports.csv'
with(
rowterminator = '\n',
fieldterminator = ';'
)