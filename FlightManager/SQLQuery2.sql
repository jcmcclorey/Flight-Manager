update dbo.Airports
set City = 'Aalen-Heidenheim'
where Id = 382;

select * from dbo.Airports
where City like '%-%';