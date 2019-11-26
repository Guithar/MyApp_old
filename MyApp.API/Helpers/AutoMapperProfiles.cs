using System.Linq;
using AutoMapper;
using MyApp.API.Dtos;
using MyApp.API.Models;

namespace MyApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.MapFrom(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.MapFrom(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt => opt
                    .MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt => opt
                    .MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<Client,ClientForListDto>();
            CreateMap<Client,ClientForDetailedDto>();
            CreateMap<ClientForUpdateDto,Client>();
            CreateMap<ClientForCreationDto,Client>();
            CreateMap<Client,ClientToReturnDto>();

            CreateMap<Asset,AssetForListDto>();
            CreateMap<Asset,AssetForDetailedDto>();
            CreateMap<AssetForUpdateDto,Asset>();
            CreateMap<AssetForCreationDto,Asset>();

            CreateMap<Product,ProductForListDto>().ReverseMap();
            CreateMap<ProductForUpdateDto,Product>();
            CreateMap<ProductForCreationDto,Product>();
            CreateMap<Product,ProductForDetailedDto>();
            CreateMap<ProductCategory,ProductCategoryForListDto>();

            CreateMap<MaintScheduleAsset,MaintForListDto>()
            .ForPath(m => m.product.Id, opt => opt
                    .MapFrom(msa => msa.Asset.Product.Id))
            .ForPath(m => m.product.Name, opt => opt
                    .MapFrom(msa => msa.Asset.Product.Name))
            .ForPath(m => m.product.Description, opt => opt
                    .MapFrom(msa => msa.Asset.Product.ProductCategory.Description))
            .ForPath(m => m.product.ProductCategoryId, opt => opt
                    .MapFrom(msa => msa.Asset.Product.ProductCategoryId))
            .ForPath(m => m.product.ProductCategoryName, opt => opt
                    .MapFrom(msa => msa.Asset.Product.ProductCategory.Name))


        .ForMember(m => m.MaintScheduleName, opt => opt
                    .MapFrom(msa => msa.MaintSchedule.Name))
            .ForMember(m => m.Location, opt => opt
                    .MapFrom(msa => msa.Asset.Location))
            .ForMember(m => m.ManufacturedDate, opt => opt
                    .MapFrom(msa => msa.Asset.ManufacturedDate))
            .ForMember(m => m.Quantity, opt => opt
                    .MapFrom(msa => msa.Asset.Quantity))
           
            .ForMember(m => m.LastRev, opt => opt
                .MapFrom(msa => msa.MaintResults
                    .OrderByDescending(c => c.ExecutedOn)
                    .FirstOrDefault().ExecutedOn))
            .ForMember(m => m.NextRev, opt => opt
                .MapFrom(msa => msa.MaintResults
                    .OrderByDescending(c => c.ExecutedOn)
                    .FirstOrDefault().NextRevision))
            .ForMember(m => m.LastResult, opt => opt
                .MapFrom(msa => msa.MaintResults
                    .OrderByDescending(c => c.ExecutedOn)
                    .FirstOrDefault().Result))
            .ForMember(m => m.MonthsInterval, opt => opt
                    .MapFrom(msa => msa.MaintSchedule.MonthsInterval));
        }

    }
}